import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import ThreeView2D from './ThreeView2D';
import Materials from './Materials';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Designer2D extends React.Component {

    componentDidMount() {
        setTimeout(() => this.render(), 1000);
    }

    render() {
        if (!this.props.sketchJson) {
            return null;
        }
        const {currentGroupKey, sketchJson} = this.props;

        const groupKey = currentGroupKey ? currentGroupKey : 
            sketchJson && Object.keys(sketchJson).length > 0 ? Object.keys(sketchJson)[0] : null;

        const groupJson = Object.assign({}, sketchJson[groupKey]);
        groupJson.rotation = [0,0,0];
        groupJson.position = [0,0,0];
        const currentJson = {};
        currentJson[groupKey] = groupJson;

        return (
            <div>
                { (groupKey) ?
                    <ThreeView2D json={currentJson} onViewSelect={this.props.onViewSelect} />
                    : null }
                <SelectField
                    style={{margin: '0 20px'}}
                    floatingLabelText="Group"
                    value={groupKey}
                    onChange={(event, index, value) => {
                        this.props.handleSelectGroup(value)
                    }}
                >
                    { sketchJson    ? 
                        Object.keys(sketchJson).map((key, index) => <MenuItem key={key} value={key} primaryText={key} />)
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