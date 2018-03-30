import React, { Component } from 'react';

import Designer2DGroup from './Designer2DGroup';
import GroupCreate from './GroupCreate';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class Designer2D extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentGroupKey: this.getFirstGroup()
        };
    }

    componentDidUpdate() {
        // if no corresponding group, get default
        if (!this.props.groups[this.state.currentGroupKey]) {
            const currentGroupKey = this.getFirstGroup();
            if (currentGroupKey) {
                this.setState({currentGroupKey});
            }
        }
    }

    handleCreateGroup = (key) => {
        if (!this.props.groups[key]) { 
            this.props.handleUpdateGroup(key, '');
            this.setState({
                currentGroupKey: key
            });
        }
    };

    getFirstGroup() {
        if (this.props.groups) {
            const keys = Object.keys(this.props.groups)
            if (keys.length > 0) {
                return keys[keys.length-1];
            }
        }
        return null;
    }
            
    render() {
        if (!this.props.groups) {
            return null;
        }

        const currentGroupKey = this.state.currentGroupKey;
        let text = this.props.groupsText[currentGroupKey];
        let json = this.props.groups[currentGroupKey];
        const groupKeys = Object.keys(this.props.groups).reverse();

        return (
            <div className="col-md-10 col-md-offset-1">
                <div className="col-md-2" style={{paddingRight: '10px'}}>
                    <GroupCreate handleCreate={this.handleCreateGroup} />
                    <Menu
                        disableAutoFocus={true}
                        value={currentGroupKey}
                        onChange={(event, currentGroupKey) => this.setState({currentGroupKey})}
                        children={groupKeys.map(key => 
                            <MenuItem key={key} value={key} primaryText={key} style={{width: '180px'}} />
                        )}
                    />
                </div>
                <div className="col-md-10">
                    { currentGroupKey ? 
                        <Designer2DGroup 
                            name={currentGroupKey}
                            json={json}
                            text={text}
                            handleTextChange={(text) => this.props.handleUpdateGroup(currentGroupKey, text)}
                            handleRemoveGroup={this.props.handleRemoveGroup}
                            handleEditGroupName={this.props.handleEditGroupName}
                        /> : null
                    }
                </div>
            </div>
        );
    }
}
