import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';

import Vars from './Vars';
import Designer2DNew from './Designer2DNew';
import Designer3D from './Designer3D';

import { className } from './JSONSketch.less';

export default class JSONSketch extends React.Component {

    constructor(props) {
        super(props);

        const defaults = {
            sketchText: ''
        };

        const savedState = JSON.parse(localStorage.getItem('state'));

        this.lastLegalState = {};

        this.state = {
            currentGroupIndex: -1,
            currentPartIndex: -1,
            sketchText: savedState && savedState.sketchText ? savedState.sketchText : defaults.sketchText,
            currentRowIndex: -1
        };
    }

    componentDidUpdate() {
        localStorage.setItem('state', JSON.stringify(this.state));
    }

    handleSelectGroup = (currentGroupIndex) => {
        //console.log('currentGroupIndex', currentGroupIndex);
        this.setState({currentGroupIndex});
    };

    handleUpdateSketchText = (sketchText) => {
        this.setState({sketchText});
    };

    convertTo3D = (json2D) => {
        if (!json2D || json2D.length < 4) {
            return null;
        }
        // [ type, [pos2D], length, rotation2D ] -> [ type, [size3D], [pos3D], [rot3D] ]
        const type = json2D[0];
        if (!type) {
            return null;
        }
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

    getSketchJson = (sketchText) => {
        if (!sketchText) {
            return {};
        }
        //console.log('sketchText', sketchText);
        let sketchJson;
        try {
            sketchJson = eval('(function() {' + sketchText + '}())');
            //console.log(sketchText);
        } catch(error) {
            console.log(error);
        }

        //console.log('sketchJson', sketchJson);
        if (!sketchJson) {
            return null;
        }
        Object.values(sketchJson).forEach(group => {
            group.parts = group.parts.map(unit => this.convertTo3D(unit));
        });
        return sketchJson;
    };

    onCursorChange = (cursorPosition) => {
        const { rowToGroupAndPart, groupAndPartToRow } = this.getRowMaps();
        const match = rowToGroupAndPart[cursorPosition.row];
        if (match) {
            this.setState({
                currentGroupIndex: match.groupIndex,
                currentPartIndex: match.partIndex,
                currentRowIndex: cursorPosition.row
            });
        }
    };

    getRowMaps = () => {
        const sketchText = this.state.sketchText;
        let sketchJson = this.getSketchJson(this.state.sketchText);

        let rowToGroupAndPart = {};
        let groupAndPartToRow = {};
        if (sketchJson) {

            const startOfJSON = sketchText.lastIndexOf('return');
            const offset = sketchText.substr(0, startOfJSON).split('\n').length;

            let jsonText = sketchText.substr(startOfJSON);

            let groupIndex = 0;

            const groupKeys = Object.keys(sketchJson);
            while (groupKeys.length > groupIndex) {
                const groupStart = jsonText.indexOf(groupKeys[groupIndex]);
                const groupEnd = groupKeys.length > groupIndex+1 ? jsonText.indexOf(groupKeys[groupIndex+1]) : jsonText.length;
                const groupText = jsonText.substr(groupStart, groupEnd-groupStart-1);
                const groupLength = groupText.split('\n').length-1;
                const groupRowOffset = jsonText.substr(0, groupStart).split('\n').length;

                const partsStart = groupText.indexOf('parts:');
                const firstPartLine = groupText.substr(0, partsStart).split('\n').length;

                for (var i = 0; i < groupLength; i++) {
                    const row = offset + groupRowOffset + i - 2;
                    let partIndex;
                    if (i >= firstPartLine) {
                        partIndex = i - firstPartLine;
                    }
                    rowToGroupAndPart[row] = { groupIndex, partIndex };
                    groupAndPartToRow[groupIndex + '.' + partIndex] = row;
                }
                groupIndex++;
            }
        }
        return { rowToGroupAndPart, groupAndPartToRow };
    };

    onViewSelect = (part) => {
        //console.log('part', part);
        const { rowToGroupAndPart, groupAndPartToRow } = this.getRowMaps();
        //console.log('row', row);

        let sketchJson = this.getSketchJson(this.state.sketchText);
        let groupIndex = -1;
        Object.keys(sketchJson).forEach((key, index) => {
            if (key === part.groupKey) {
                groupIndex = index;
            }
        });

        const row = groupAndPartToRow[groupIndex + '.' + part.partIndex];

        this.setState({
            currentGroupIndex: groupIndex,
            currentPartIndex: part.partIndex,
            currentRowIndex: row
        });
    };

    render() {
        const {stepIndex} = this.state;
        localStorage.setItem('state', JSON.stringify(this.state));

        // Calculate all based on state update
        let sketchJson = this.getSketchJson(this.state.sketchText);
        let editorBorderColor;
        if (!sketchJson) {
            sketchJson = this.lastLegalState;
            editorBorderColor = '#F92672';
        } else {
            // legal!
            this.lastLegalState = sketchJson;
            editorBorderColor = '#2F3024';
            //editorBorderColor = '#A6E22E';
        }
        //console.log('sketchJson', sketchJson);

        return (
            <div className="container-fluid projectPage json-sketch">
                <MuiThemeProvider>
                    <div className="container-fluid">
                        <div className="detailPageHeader">
                            <h2>
                                2x4.JS&nbsp;&nbsp;<small>2018</small>
                            </h2>
                        </div>
                        <div className="row" style={{marginBottom: '100px'}}>
                            <div className="col-md-6">
                                <Paper>
                                    <div style={{borderTop: '10px solid ' + editorBorderColor}}>
                                        <AceEditor
                                            mode="javascript"
                                            theme="monokai"
                                            key="testdiv"
                                            onChange={newValue => this.setState({sketchText: newValue})}
                                            onCursorChange={selection => this.onCursorChange(selection.getCursor())}
                                            name="UNIQUE_ID_OF_DIV"
                                            editorProps={{$blockScrolling: true}}
                                            setOptions={{
                                                showLineNumbers: false,
                                                tabSize: 2,
                                            }}
                                            markers={[{ 
                                                startRow: this.state.currentRowIndex, 
                                                endRow: this.state.currentRowIndex, 
                                                startCol: 0,
                                                endCol: 1,
                                                className: 'select-marker', 
                                                type: 'background'
                                            }]}
                                            cursorStart={this.state.cursorStart}
                                            enableLiveAutocompletion={true}
                                            value={this.state.sketchText}
                                            style={{width: '100%', height: '700px', borderTop: '10px solid #2F3024'}}
                                        />
                                    </div>
                                </Paper>
                            </div>
                            <div className="col-md-6">
                                <Paper>
                                    <Tabs initialSelectedIndex={1}>
                                        <Tab label="2D Designer" >
                                          <div>
                                            <Designer2DNew 
                                                sketchJson={sketchJson}
                                                currentGroupIndex={this.state.currentGroupIndex}
                                                currentPartIndex={this.state.currentPartIndex}
                                                onViewSelect={this.onViewSelect}
                                                handleSelectGroup={this.handleSelectGroup}
                                            />
                                          </div>
                                        </Tab>
                                        <Tab label="3D Designer" >
                                          <div>
                                            <Designer3D 
                                                sketchJson={sketchJson}
                                                currentGroupIndex={this.state.currentGroupIndex}
                                                currentPartIndex={this.state.currentPartIndex}
                                                onViewSelect={this.onViewSelect}
                                            />
                                          </div>
                                        </Tab>
                                      </Tabs>
                                </Paper>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}