import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Slider from 'material-ui/Slider';

import Materials from './Materials';
import ThreeView from './ThreeView';

export default class Designer3D extends React.Component {

    state = {
        visibility: {}
    };

    componentDidMount() {
        setTimeout(() => this.render(), 1000);
    }

    handleToggleGroup = (key) => {
        const visibility = Object.assign({}, this.state.visibility);
        if (key in visibility) {
            visibility[key] = !visibility[key];
        } else {
            visibility[key] = false;
        }
        this.setState({visibility});
    };

    renderChip(key) {
        let isVisible = true;
        if (key in this.state.visibility) {
            isVisible = this.state.visibility[key];
        }

        return (
            <Chip
                key={key}
                backgroundColor={isVisible ? '#BBB' : '#444' }
                onClick={() => this.handleToggleGroup(key)}
                style={{margin: '4px'}}
            >
                {key}
            </Chip>
        );
    }

    render() {
        if (!this.props.sketchJson || !this.state.visibility) {
            return null;
        }

        // filter hidden groups based on visibility
        let filteredSketchJson = {};
        Object.keys(this.props.sketchJson).forEach((key, index) => {
            if (this.state.visibility[key] !== false) {
                const group = Object.assign({}, this.props.sketchJson[key]);

                group.isSelected = this.props.currentGroupIndex === index;
                if (group.isSelected && group.parts[this.props.currentPartIndex]) {
                    group.parts[this.props.currentPartIndex].push('selected');
                }

                filteredSketchJson[key] = group;
            }
        });

        return (
            <div>
                <ThreeView json={filteredSketchJson} onViewSelect={this.props.onViewSelect} />
                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 20px', padding: '10px 0 20px' }}>
                    { Object.keys(this.props.sketchJson).map(key => this.renderChip(key)) }
                </div>
            </div>
        )
    }
}