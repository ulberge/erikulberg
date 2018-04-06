import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import Vars from './Vars';
import Designer2D from './Designer2D';
import Designer3D from './Designer3D';

export default class JSONSketch extends React.Component {

    constructor(props) {
        super(props);

        const defaults = {
            sketchText: ''
        };

        const savedState = JSON.parse(localStorage.getItem('state'));

        this.lastLegalState = {};

        this.state = {
            stepIndex: 1,
            currentGroupIndex: 0,
            currentPartIndex: -1,
            sketchText: savedState && savedState.sketchText ? savedState.sketchText : defaults.sketchText
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

    getGroupLineMap = (sketchJson, sketchText) => {
        // count line breaks before match
        const groupKeys = Object.keys(sketchJson);
        const keyStarts = groupKeys.map(key => {
            const keyIndex = sketchText.indexOf(key);
            const beforeKey = sketchText.substr(0, keyIndex);
            const linesBeforeKey = beforeKey.match(/\n/g).length;
            //console.log('lines before ' + key, linesBeforeKey);
            return linesBeforeKey;
        });

        const totalLines = sketchText.match(/\n/g).length;
        let lastMatch;
        let lineMap = {};
        let currentIndex = 0;
        groupKeys.forEach((key, index) => {
            const currentGroupStartIndex = keyStarts[index];
            while (currentIndex < currentGroupStartIndex) {
                lineMap[currentIndex] = lastMatch;
                currentIndex++;
            }
            lastMatch = index;
        });
        while (currentIndex < totalLines) {
            lineMap[currentIndex] = lastMatch;
            currentIndex++;
        }
        //console.log('lineMap', lineMap);

        return lineMap;
    };

    onCursorChange = (row) => {
        let sketchJson = this.getSketchJson(this.state.sketchText);
        if (sketchJson) {
            const groupLineMap = this.getGroupLineMap(sketchJson, this.state.sketchText);
            const currentGroupIndex = groupLineMap[row];
            if (currentGroupIndex !== undefined) {
                // inside group
                this.setState({currentGroupIndex});

                // count lines backward to 'parts'
                const textRows = sketchText.split('\n');
                let partsStartLine = row;
                while (partsStartLine >= 0 && !textRows[partsStartLine].includes('parts')) {
                    partsStartLine--;
                }
                if (partsStartLine > 0) {
                    const currentPartIndex = row - partsStartLine - 1;
                    console.log('currentPartIndex', currentPartIndex);
                    this.setState({currentPartIndex});
                }
            }
        }
    }

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
            <div className="container-fluid projectPage">
                <MuiThemeProvider>
                    <div className="container-fluid">
                        <div className="detailPageHeader">
                            <h2>
                                Sketch&nbsp;&nbsp;<small>2018</small>
                            </h2>
                        </div>
                        <div className="row" style={{marginBottom: '100px'}}>
                            <div className="col-xs-6">
                                <div style={{borderTop: '10px solid ' + editorBorderColor}}>
                                    <AceEditor
                                        mode="javascript"
                                        theme="monokai"
                                        key="testdiv"
                                        onChange={newValue => this.setState({sketchText: newValue})}
                                        onCursorChange={selection => this.onCursorChange(selection.getCursor().row)}
                                        name="UNIQUE_ID_OF_DIV"
                                        editorProps={{$blockScrolling: true}}
                                        setOptions={{
                                            enableBasicAutocompletion: true,
                                            enableLiveAutocompletion: true,
                                            enableSnippets: false,
                                            showLineNumbers: true,
                                            tabSize: 2,
                                        }}
                                        value={this.state.sketchText}
                                        style={{width: '100%', height: '620px', borderTop: '10px solid #2F3024'}}
                                    />
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <Tabs>
                                    <Tab label="2D Designer" >
                                      <div>
                                        <Designer2D 
                                            sketchJson={sketchJson}
                                            handleSelectGroup={this.handleSelectGroup}
                                            currentGroupIndex={this.state.currentGroupIndex}
                                            currentPartIndex={this.state.currentPartIndex}
                                        />
                                      </div>
                                    </Tab>
                                    <Tab label="3D Designer" >
                                      <div>
                                        <Designer3D 
                                            sketchJson={sketchJson}
                                            currentGroupIndex={this.state.currentGroupIndex}
                                        />
                                      </div>
                                    </Tab>
                                  </Tabs>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}