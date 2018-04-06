import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

export default class Designer2DGroup extends Component {

    clarity = 3;
    width = 480;
    height = 360;
    offset = 36;
    gridSize = 36;

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
        
        this.drawGrid(ctx);

        const json = this.props.groupJson;
        //console.log(json);
        if (json && json.parts) {
            const parts = json.parts;
            let textIndex = 0;
            let cuts = {};
            parts.forEach(part => {
                //console.log('part', part);
                ctx.save();
                ctx.beginPath();
                ctx.lineWidth=1;
                ctx.strokeStyle = '#000';
                //console.log('x,y', (this.offset+(this.clarity*part[2][0])) + ', ' + (-this.offset+this.height-(this.clarity*part[2][1])));
                ctx.translate(this.offset+(this.clarity*part[2][0]),this.height-this.offset-(this.clarity*part[2][1]));
                ctx.strokeRect(0,0, this.clarity*part[1][0], this.clarity*-part[1][1]);
                ctx.closePath();

                ctx.beginPath();
                ctx.font = "11px Arial";
                ctx.strokeStyle = '#000';
                let length;
                if (part[1][0] > part[1][1]) {
                    // Print text on wide piece
                    ctx.translate(-(28*textIndex)+this.clarity*part[1][0]/2, -26);
                    ctx.fillText(this.convertInchesToFeet(part[1][0]),0,0);

                    length = part[1][0];
                } else {
                    // Print text on thin piece
                    ctx.translate(16, -(8*textIndex)-this.clarity*part[1][1]/2);
                    ctx.fillText(this.convertInchesToFeet(part[1][1]),0,0);

                    length = part[1][1];
                }

                if (cuts[part[0].label]) {
                    cuts[part[0].label].push(length);
                } else {
                    cuts[part[0].label] = [length];
                }

                ctx.closePath();
                ctx.restore();

                // ctx.translate(unit[2][0]*3,height-unit[2][1]*3);
                // ctx.rotate(-unit[3]*Math.PI/180);
                textIndex++;
                if (textIndex > 8) {
                    textIndex = 0;
                }
            });

            //console.log('cuts', cuts);
            const compiled = {};
            Object.keys(cuts).forEach(key => {
                const cutList = cuts[key];
                //console.log('cutList', cutList);
                let result = {
                    cuts: cutList.map(cut => this.convertInchesToFeet(cut)),
                    total: 0
                };
                //console.log('result', result);
                cutList.forEach(cut => result.total += cut);
                result.total = this.convertInchesToFeet(result.total);
                compiled[key] = result;
            });
            //console.log(this.props.name + ': ', JSON.stringify(compiled, null, 2).replace(new RegExp(/'/, 'g'), 'ft').replace(new RegExp(/\\"/, 'g'), 'in').replace(new RegExp(/"/, 'g'), '').replace(new RegExp(/ft/, 'g'), '\'').replace(new RegExp(/in/, 'g'), '"'));
        }
    }

    drawGrid(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = '#bbb';
        ctx.lineWidth=0.5;

        for (var x = 0; x <= this.width; x += this.gridSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }

        for (var y = 0; y <= this.height; y += this.gridSize) {
            ctx.moveTo(0, this.height-y);
            ctx.lineTo(this.width, this.height-y);
            ctx.stroke();
        }
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = '#333';
        ctx.lineWidth=1;
        ctx.moveTo(this.offset, this.height);
        ctx.lineTo(this.offset, 0);
        ctx.stroke();
        ctx.moveTo(0, this.height-this.offset);
        ctx.lineTo(this.width, this.height-this.offset);
        ctx.stroke();
        ctx.closePath();
    }

    convertInchesToFeet(l) {
        const ft = Math.floor(l/12);
        const inches = l-(12*ft);
        return ft + '\' ' + inches + '"';
    }
            
    render() {
        return (
            <div>
                <canvas ref="canvas" height={this.height} width={this.width} 
                    style={{padding: '20px', width: '100%', background: '#ddd'}}
                ></canvas>
            </div>
        );
    }
}