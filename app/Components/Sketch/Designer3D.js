import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Slider from 'material-ui/Slider';

export default class Designer3D extends React.Component {

    state = {
        visibility: {}
    };

    componentDidMount() {
        const sketch = $('#sketchIframe');
        sketch.width('100%');
        sketch.height('480px');
        $('.iframeOverlap').click(function focusIframe() {
            sketch.focus();
        });
        
        setTimeout(() => this.updateSketch(), 1000);
    }

    iframe() {
        return {
            __html: '<iframe id="sketchIframe" src="sketch/shed.html" frameBorder="0" scrolling="no"></iframe>'
        };
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

    updateSketch() {
        if (this.props.sketchJson && this.state.visibility) {
            // filter hidden groups based on visibility
            let filteredSketchJson = {};
            Object.keys(this.props.sketchJson).forEach(key => {
                if (this.state.visibility[key] !== false) {
                    filteredSketchJson[key] = this.props.sketchJson[key];
                }
            });
            // render in iframe
            if (document.getElementById('sketchIframe') && document.getElementById('sketchIframe').contentWindow && document.getElementById('sketchIframe').contentWindow.updateSketch) {
                document.getElementById('sketchIframe').contentWindow.updateSketch(filteredSketchJson);
            }
            return filteredSketchJson;
        }
        return null;
    }

    render() {
        this.updateSketch();

        return (
            <div>
                <div className="col-md-5">
                    <TextField 
                        value={this.props.sketchText}
                        name="jsonStr"
                        onChange={(event) => this.props.handleTextChange(event.target.value)}
                        style={{width: '100%', fontSize: '14px'}}
                        multiLine={true}
                        rows={21}
                        rowsMax={21}
                    />
                </div>
                <div className="col-md-7">
                    <div className="iframeContainer clearFix">
                        <div dangerouslySetInnerHTML={ this.iframe() } />
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            { this.props.groups    ? 
                                Object.keys(this.props.groups).map(key => this.renderChip(key))
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}