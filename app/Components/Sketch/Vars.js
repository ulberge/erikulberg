import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class Vars extends Component {

    render() {
        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <TextField 
                    value={this.props.text}
                    name="json"
                    onChange={(event) => this.props.handleTextChange(event.target.value)}
                    style={{width: '100%', fontSize: '14px'}}
                    multiLine={true}
                    rows={10}
                    rowsMax={10}
                />
            </div>
        );
    }
}
