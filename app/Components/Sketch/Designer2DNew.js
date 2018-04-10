import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import ThreeView2D from './ThreeView2D';
import Materials from './Materials';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Designer2DNew extends React.Component {

    componentDidMount() {
        setTimeout(() => this.render(), 1000);
    }

    render() {
        if (!this.props.sketchJson) {
            return null;
        }

        let currentGroupIndex = 0;
        if (this.props.currentGroupIndex >= 0) {
            currentGroupIndex = this.props.currentGroupIndex;
        }
        //console.log('this.props.sketchJson', this.props.sketchJson);
        const currentGroupKey = this.props.sketchJson ? Object.keys(this.props.sketchJson)[currentGroupIndex] : {};
        const groupJson = Object.assign({}, this.props.sketchJson[currentGroupKey]);
        groupJson.rotation = [0,0,0];
        groupJson.position = [0,0,0];
        const currentJson = {};
        currentJson[currentGroupKey] = groupJson;

        return (
            <div>
                <ThreeView2D json={currentJson} onViewSelect={this.props.onViewSelect} />
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
        )
    }
}