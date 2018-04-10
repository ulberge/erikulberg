import React, { Component } from 'react';

import Designer2DGroup from './Designer2DGroup';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Materials from './Materials';

export default class Designer2D extends Component {

    render() {
        let currentGroupIndex = 0;
        if (this.props.currentGroupIndex >= 0) {
            currentGroupIndex = this.props.currentGroupIndex;
        }
        //console.log('this.props.sketchJson', this.props.sketchJson);
        const currentGroupKey = this.props.sketchJson ? Object.keys(this.props.sketchJson)[currentGroupIndex] : {};
        const groupJson = this.props.sketchJson[currentGroupKey];

        return (
            <div>
                { currentGroupKey ? 
                    <Designer2DGroup 
                        name={currentGroupKey}
                        groupJson={groupJson}
                        currentPartIndex={this.props.currentPartIndex}
                    /> : null
                }
                <SelectField
                    style={{margin: '0 20px'}}
                    floatingLabelText="Group"
                    value={currentGroupIndex}
                    onChange={(event, key, value) => this.props.handleSelectGroup(value)}
                >
                    { this.props.sketchJson    ? 
                        Object.keys(this.props.sketchJson).map((key, index) => <MenuItem key={key} value={index} primaryText={key} />)
                        : null
                    }
                </SelectField>
                <Materials
                    sketchJson={{'_': groupJson}}
                />
            </div>
        );
    }
}
