import React, { Component } from 'react';

import Designer2DGroup from './Designer2DGroup';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Designer2D extends Component {

    render() {
        const currentGroupIndex = this.props.currentGroupIndex;
        //console.log('this.props.sketchJson', this.props.sketchJson);
        const currentGroupKey = this.props.sketchJson ? Object.keys(this.props.sketchJson)[currentGroupIndex] : {};
        const groupJson = this.props.sketchJson[currentGroupKey];

        return (
            <div>
                <SelectField
                  floatingLabelText="Group"
                  value={this.props.currentGroupIndex}
                  onChange={(event, key, value) => this.props.handleSelectGroup(value)}
                >
                    { this.props.sketchJson    ? 
                        Object.keys(this.props.sketchJson).map((key, index) => <MenuItem key={key} value={index} primaryText={key} />)
                        : null
                    }
                </SelectField>
                { currentGroupKey ? 
                    <Designer2DGroup 
                        name={currentGroupKey}
                        groupJson={groupJson}
                    /> : null
                }
            </div>
        );
    }
}
