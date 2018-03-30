import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

export default class Designer2DGroup extends Component {

    clarity = 3;
    width = 480;
    height = 360;

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {
        const canvas = this.refs.canvas;
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#000';
        ctx.font = "4px Arial";
        ctx.lineWidth = 0.5;
        
        this.drawGrid(ctx);

        const json = this.props.json;
        console.log(json);
        if (json && Array.isArray(json)) {
            let textIndex = 0;
            json.forEach(unit => {
                ctx.save();
                ctx.scale(this.clarity, this.clarity);
                ctx.translate(unit[2][0],(this.height/this.clarity)-unit[2][1]);
                ctx.strokeRect(0,0, unit[1][0], -unit[1][1]);

                if (unit[1][0] > unit[1][1]) {
                    // Print text on wide piece
                    ctx.translate(-(8*textIndex)+10+unit[1][0]/2, -4);
                    ctx.fillText(this.convertInchesToFeet(unit[1][0]),0,0);
                } else {
                    // Print text on thin piece
                    ctx.translate(2, -(4*textIndex)-unit[1][1]/2);
                    ctx.fillText(this.convertInchesToFeet(unit[1][1]),0,0);
                }

                // ctx.translate(unit[2][0]*3,height-unit[2][1]*3);
                // ctx.rotate(-unit[3]*Math.PI/180);
                ctx.restore();
                textIndex++;
                if (textIndex > 4) {
                    textIndex = 0;
                }
            });
        }
    }

    drawGrid(ctx) {
        ctx.save();
        ctx.strokeStyle = '#bbb';
        const gridSize = 12*this.clarity;

        for (var x = 0; x <= this.width; x += gridSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }

        for (var y = 0; y <= this.height; y += gridSize) {
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
        }

        ctx.restore();
    }

    convertInchesToFeet(l) {
        const ft = Math.floor(l/12);
        const inches = l-(12*ft);
        return ft + '\' ' + inches + '"';
    }
            
    render() {
        return (
            <div className="">
                <div className="col-md-4">
                    <h3>
                        <div style={{float: 'right'}}>
                            <FlatButton label="Remove" secondary={true} style={{marginTop: '-6px'}}
                                onClick={() => this.props.handleRemoveGroup(this.props.name)} />
                        </div>
                        <span>{this.props.name}</span>
                    </h3>
                    <Divider style={{width:'100%'}}/>
                    <TextField 
                        key="text"
                        value={this.props.text}
                        name="text"
                        onChange={(event) => this.props.handleTextChange(event.target.value)}
                        style={{width: '100%', fontSize: '14px'}}
                        multiLine={true}
                        rows={12}
                        rowsMax={12}
                    />
                </div>
                <div className="col-md-8">
                    <canvas ref="canvas" height={this.height} width={this.width} 
                        style={{padding: '20px', width: '100%', background: '#ddd'}}
                    ></canvas>
                </div>
            </div>
        );
    }
}


/*
[
['w',width,0,height-board_t,'h'],
['w',width,0,height-(board_t*2),'h'],
['w',height-(board_t*3),0,board_t,'v'],
['w',height-(board_t*3),(width-board_t)/2,board_t,'v'],
['w',height-(board_t*3),width-board_t,board_t,'v'],
['w',width,0,0,'h'],
]
*/