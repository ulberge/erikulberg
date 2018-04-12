import React from 'react';
import Paper from 'material-ui/Paper';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';

export default class Editor extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        console.log('Rerender Ace Editor');
        const delay = 300;

        return (
            <Paper>
                <div style={{borderTop: '10px solid ' + (this.props.isLegal ? '#2F3024' : '#F92672')}} >
                    <AceEditor
                        mode="javascript"
                        theme="monokai"
                        ref="reactAceComponent"
                        value={this.props.value}
                        onChange={value => {
                            this.value = value;
                            // delay update until value stays same for more than delay
                            setTimeout(() => {
                                if (this.value === value) {
                                    this.props.onUpdate(value);
                                }
                            }, delay);
                        }}
                        /*onSelectionChange={(selection) => {
                            const cursorRow = selection.getCursor().row;
                            this.setState({cursorRow});
                            setTimeout(() => {
                                if (this.state.cursorRow === cursorRow) {
                                    this.props.onSelectRow(cursorRow);
                                }
                            }, delay);
                        }}*/
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{$blockScrolling: true}}
                        setOptions={{
                            showLineNumbers: false,
                            tabSize: 2,
                        }}
                        showPrintMargin={false}
                        showGutter={true}
                        highlightActiveLine={true}
                        enableLiveAutocompletion={false}
                        style={{width: '100%', height: '651px', borderTop: '10px solid #2F3024'}}
                    />
                </div>
            </Paper>
        )
    }
}