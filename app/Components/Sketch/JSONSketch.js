import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    Step,
    Stepper,
    StepLabel,
    StepButton
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Vars from './Vars';
import Designer2D from './Designer2D';
import Designer3D from './Designer3D';

export default class JSONSketch extends React.Component {

    constructor(props) {
        super(props);

        const defaults = {
            varsText: 'h = 86\nw = 48\nl = 84\nbw = 3.5\nbt = 1.5\nWOOD = { label: \'HemFir\', dimensions: [120,1.5,3.5] }\nT_WOOD = { label: \'Treated Wood\', dimensions: [120,1.5,3.5] }',
            groupsText: {
                wall1: 'WOOD, [ 0, h-bt ], w, "_"\nWOOD, [ 0, h-2*bt ], w, "_"\nWOOD, [ 0, bt ], h-3*bt, "|"\nWOOD, [ (w-bt)/2, bt ], h-3*bt, "|"\nWOOD, [ w-bt, bt ], h-3*bt, "|"\nT_WOOD, [ 0, 0 ], w, "_"'
            },
            sketchText: 'wall1: [0,0,0], [0,0,0]'
        };

        const savedState = JSON.parse(localStorage.getItem('state'));

        this.state = {
            stepIndex: 0,
            varsText: savedState && savedState.varsText ? savedState.varsText : defaults.varsText,
            groupsText: savedState && savedState.groupsText ? savedState.groupsText : defaults.groupsText,
            sketchText: savedState && savedState.sketchText ? savedState.sketchText : defaults.sketchText
        };
    }

    componentDidUpdate() {
        localStorage.setItem('state', JSON.stringify(this.state));
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    handleVarsChange = (varsText) => {
        this.setState({varsText});
    };

    handleUpdateGroup = (groupName, text) => {
        let update = {};
        update[groupName] = text;
        const groupsText = Object.assign({}, this.state.groupsText, update);
        this.setState({groupsText});
    };

    handleRemoveGroup = (key) => {
        console.log('Delete: ' + key);
        const groups = Object.assign({}, this.state.groups);
        delete groups[key];
        this.setState({groups});
    };

    handleEditGroupName = (key, newKey) => {
        const groups = Object.assign({}, this.state.groups);
        const group = groups[key];
        delete groups[key];
        groups[newKey] = group;
        this.setState({groups});
    };

    handleUpdateSketchText = (sketchText) => {
        this.setState({sketchText});
    };

    getVars = (varsText) => {
        const transformedVarsText = '{' + varsText.replace(new RegExp(/=/, 'g'), ':').split('\n').join(',') + '}';
        //console.log(transformedVarsText);
        try {
            const vars = eval('(' + transformedVarsText + ')');
            //console.log(vars);
            return vars;
        } catch (error) {
            console.log(error);
        }
        return {};
    };

    getGroups = (vars, groupsText) => {
        let groups = {};
        Object.keys(groupsText).forEach(key => {
            const json = this.getJson(vars, groupsText[key]);
            groups[key] = json;
        });
        return groups;
    };

    getJson = (vars, text) => {
        if (!text) {
            return [];
        }
        console.log(text);
        const transformedText = '[[' + text.split('\n').join('],\n[') + ']]';
        const json2D = this.evalWithParams(vars, transformedText);
        if (!Array.isArray(json2D)) {
            return [];
        }

        let json3D = [];
        json2D.forEach(unit => {
            const converted = this.convertTo3D(unit);
            if (converted) {
                json3D.push(converted);
            }
        });
        return Array.isArray(json3D) ? json3D : [];
    };

    convertTo3D = (json2D) => {
        if (!json2D || json2D.length < 2) {
            return null;
        }
        // [ type, [pos2D], length, rotation2D ] -> [ type, [size3D], [pos3D], [rot3D] ]
        const type = json2D[0];
        const position = json2D[1];
        const position3D = [position[0], position[1], 0];
        const rotation3D = [0,0,0];
        let size3D = [type.dimensions[0], type.dimensions[1], type.dimensions[2]];

        // if length and rotation provided
        if (json2D.length > 3) {
            length = json2D[2];
            const rotation = json2D[3];
            switch (rotation) {
                case '_':
                    size3D = [length, type.dimensions[1], type.dimensions[2]];
                    break;
                case '|':
                    size3D = [type.dimensions[1], length, type.dimensions[2]];
                    break;
                default:
                    size3D = [length, type.dimensions[1], type.dimensions[2]];
                    break;
            }
        }
        
        var json3D = [type, size3D, position3D, rotation3D];
        return json3D;
    };

    getSketchJson = (vars, groups, sketchText) => {
        const groupsData = sketchText.split('\n');
        let sketchJson = {};
        groupsData.forEach(groupData => {
            const groupDataParts = groupData.split(':');
            if (groupDataParts.length !== 2) {
                return;
            }

            const groupName = groupDataParts[0];
            const posRot = this.evalWithParams(vars, '[' + groupDataParts[1] + ']');
            if (posRot && groups[groupName]) {
                const position = posRot[0];
                const rotation = posRot[1];
                sketchJson[groupName] = [
                    groups[groupName],
                    position,
                    rotation
                ];
            }
        });
        return sketchJson;
    };

    evalWithParams = (params, toEval) => {
        try {
            let evalStr = '(function(' + Object.keys(params).join(',') + '){' + 
                                                    ' return ' + toEval + 
                                                '}(' +
                                                Object.values(params).map(value => JSON.stringify(value)).join(',') +
                                            '))';
            //console.log(evalStr);
            const result = eval(evalStr);
            //console.log(result);
            return result;
        } catch(error) {
            console.log(error);
        }
    };

    render() {
        const {stepIndex} = this.state;
        localStorage.setItem('state', JSON.stringify(this.state));

        // Calculate all based on state update
        const vars = this.getVars(this.state.varsText);
        // console.log(vars);
        // console.log(this.state.groupsText);
        const groups = this.getGroups(vars, this.state.groupsText);
        console.log('groups', groups);
        const sketchJson = this.getSketchJson(vars, groups, this.state.sketchText);
        console.log('sketchJson', sketchJson);

        let step = null;
        if (stepIndex === 0) {
            step = <Vars text={this.state.varsText} handleTextChange={this.handleVarsChange}/>
        } else if (stepIndex === 1) {
            step = <Designer2D 
                                groupsText={this.state.groupsText}
                                groups={groups}
                                handleUpdateGroup={this.handleUpdateGroup}
                                handleRemoveGroup={this.handleRemoveGroup}
                                handleEditGroupName={this.handleEditGroupName}
                            />
        } else if (stepIndex === 2) {
            step = <Designer3D 
                                sketchText={this.state.sketchText}
                                sketchJson={sketchJson}
                                groups={groups}
                                handleTextChange={this.handleUpdateSketchText}
                            />
        }

        return (
            <div className="container-fluid projectPage">
                <MuiThemeProvider>
                    <div className="container-fluid">
                        <div className="detailPageHeader">
                            <h2>
                                Sketch&nbsp;&nbsp;<small>2018</small>
                            </h2>
                        </div>
                        <div className="row">
                            <div>
                                <Stepper 
                                    linear={false} 
                                    activeStep={stepIndex} 
                                    style={{width: '100%', maxWidth: 700, margin: 'auto'}}
                                >
                                    <Step>
                                        <StepButton onClick={() => this.setState({stepIndex: 0})}>
                                            Vars
                                        </StepButton>
                                    </Step>
                                    <Step>
                                        <StepButton onClick={() => this.setState({stepIndex: 1})}>
                                            2D Designer
                                        </StepButton>
                                    </Step>
                                    <Step>
                                        <StepButton onClick={() => this.setState({stepIndex: 2})}>
                                            3D Designer
                                        </StepButton>
                                    </Step>
                                </Stepper>
                                <div style={{margin: '0 16px'}}>
                                    <div>
                                        <div>{step}</div>
                                        <div style={{display: 'none' ,width: '100%', maxWidth: 700, margin: 'auto', marginTop: 12}}>
                                            <FlatButton
                                                label="Back"
                                                disabled={stepIndex === 0}
                                                onClick={this.handlePrev}
                                                style={{marginRight: 12}}
                                            />
                                            <RaisedButton
                                                label={stepIndex === 2 ? 'Finish' : 'Next'}
                                                primary={true}
                                                onClick={this.handleNext}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}