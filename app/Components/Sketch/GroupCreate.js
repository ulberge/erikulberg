import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

class GroupCreateInput extends React.Component {

    render() {
        return (
            <TextField 
                value={this.props.title}
                floatingLabelText="New Group"
                name="title"
                floatingLabelFixed={true}
                onChange={this.props.handleTextChange}
                style={{width: "180px"}}
                onKeyDown={this.props.handleTextFieldKeyDown}
            />
        );
    }
}

class GroupCreate extends React.Component {

    state = {
        title: ''
    };

    handleTextChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    };

    handleTextFieldKeyDown = (event) => {
        switch (event.key) {
            case 'Enter':
                this.props.handleCreate(this.state.title)
                this.setState({
                  title: ''
                });
                break
        }
    };

    render() {
        return (
            <GroupCreateInput key="createGroup"
                title={this.state.title}
                handleTextChange={this.handleTextChange}
                handleTextFieldKeyDown={this.handleTextFieldKeyDown}
            />
        );
    }
}

export default GroupCreate;