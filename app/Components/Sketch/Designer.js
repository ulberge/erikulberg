import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import ThreeViewer from './ThreeViewer';
import Materials from './Materials';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';

export default class Designer extends React.Component {
    
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

                group.isSelected = this.props.currentGroupKey === key;
                if (group.isSelected && group.parts[this.props.currentPartIndex]) {
                    group.parts[this.props.currentPartIndex].push('selected');
                }

                filteredSketchJson[key] = group;
            }
        });

        return (
            <div>
                <ThreeViewer json={filteredSketchJson} />
                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 20px', padding: '10px 0 20px' }}>
                    { Object.keys(this.props.sketchJson).map(key => this.renderChip(key)) }
                </div>
            </div>
        )
    }
}