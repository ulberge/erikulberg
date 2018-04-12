import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';

import Designer2D from './Designer2D';
import Designer3D from './Designer3D';

import { className } from './TwoByFour.less';

import DefaultSketch from './DefaultSketch.js';
import Editor from './Editor';
import View from './View';

export default class TwoByFour extends React.Component {

    constructor(props) {
        super(props);

        const defaults = {
            sketchText: new DefaultSketch().getSketchText()
        };

        const savedState = JSON.parse(localStorage.getItem('state'));
        this.defaultSketchText = savedState && savedState.sketchText ? savedState.sketchText : defaults.sketchText;

        this.lastLegalState = {};

        this.state = {
            currentGroupKey: null,
            currentPartIndex: null,
            sketchText: this.defaultSketchText
        };
    }

    componentDidUpdate() {
        localStorage.setItem('state', JSON.stringify(this.state));
        console.log('state', this.state);
    }

    render() {
        console.log('Rerender Parent');

        return (
            <div className="container-fluid projectPage json-sketch">
                <MuiThemeProvider>
                    <div>
                        <div className="detailPageHeader">
                            <h2>
                                2x4.JS&nbsp;&nbsp;<small>2018</small>
                            </h2>
                        </div>
                        <div className="row" style={{marginBottom: '100px'}}>
                            <div className="col-md-6">
                                <Editor
                                    ref="sketchEditor"
                                    value={this.state.sketchText}
                                    onUpdate={sketchText => this.setState({sketchText})}
                                    isLegal={true}
                                />
                            </div>
                            <div className="col-md-6">
                                <View
                                    sketchJson={this.getSketchJson(this.state.sketchText)}
                                    currentGroupKey={this.state.currentGroupKey}
                                    currentPartIndex={this.state.currentPartIndex}
                                    /*onViewSelect={({groupKey, partIndex}) => {
                                        const currentRowIndex = this.getCurrentRow(this.state.sketchText, groupKey, partIndex);
                                        console.log('currentRowIndex', currentRowIndex);
                                        this.setState({
                                            currentGroupKey: groupKey,
                                            currentPartIndex: partIndex
                                        });
                                    }}*/
                                    /*handleSelectGroup={currentGroupKey => {
                                        this.setState({currentGroupKey})
                                    }}*/
                                />
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }

    getSketchJson = (sketchText) => {
        let sketchJson = this.parseText(sketchText);
        this.formatSketchJson(sketchJson);
        return sketchJson;
    };

    parseText = (sketchText) => {
        if (!sketchText) {
            return {};
        }
        try {
            return eval('(function() {' + sketchText + '}())');
        } catch(error) {
            console.log(error);
        }
        return {};
    };

    // Convert the text area value into JSON suitable for 3D display
    formatSketchJson = (sketchJson) => {
        if (sketchJson) {
            Object.values(sketchJson).forEach(group => {
                group.parts = group.parts.map(unit => this.formatGroupJson(...unit));
            });
        }
    };

    formatGroupJson = (material, position, rotation) => {
        const size = material ? material.dimensions : null;
        switch (rotation) {
            case '_':
                rotation = [ 0, 0, 0];
                break;
            case '|':
                rotation = [ 0, 0, Math.PI/2 ];
                break;
        }
        
        return [material, size, position, rotation];
    };

    // getGroupKeyAndPartIndex = (sketchText, currentRowIndex) => {
    //     // split into array by lines
    //     // go to row, count backwards until parts to get part index
    //     // count backwards until '_*:_*{' and get *
    //     const matchPartsLine = /\s*parts:\s*\[\s*/;
    //     const matchGroupLine = /\s*(\w*):\s*\{\s*/;

    //     const lines = sketchText.split('\n');
    //     let currentGroupKey, currentPartIndex;

    //     let partsIndex = currentRowIndex;
    //     while (partsIndex >= 0 && !lines[partsIndex].match(matchPartsLine)) {
    //         partsIndex--;
    //     }
    //     const linesUntilParts = currentRowIndex-partsIndex;

    //     let groupIndex = currentRowIndex;
    //     while (groupIndex >= 0 && !lines[groupIndex].match(matchGroupLine)) {
    //         groupIndex--;
    //     }
    //     const linesUntilGroupKey = currentRowIndex-groupIndex;

    //     if (linesUntilParts > linesUntilGroupKey) { // wrong parts found, outside parts
    //         currentPartIndex = -1;
    //     } else {
    //         currentPartIndex = linesUntilParts-1;
    //     }

    //     if (groupIndex >= 0) {
    //         currentGroupKey = lines[groupIndex].match(matchGroupLine)[1];
    //     }

    //     console.log('currentPartIndex', currentPartIndex);
    //     console.log('currentGroupKey', currentGroupKey);
    //     return {currentGroupKey, currentPartIndex};
    // };

    // getCurrentRow = (sketchText, groupKey, partIndex) => {
    //     return -1;
    // };
}