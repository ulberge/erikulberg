import React, { Component } from 'react';

export default class Designer2DGroup extends Component {

    clarity = 3;
    width = 468;
    height = 360;
    offset = 36;
    gridSize = 36;

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    shadeColor(color, percent) {   
        var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
        return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    }
    blendColors(c0, c1, p) {
        var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
        return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
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
            parts.forEach((part, index) => {
                //console.log('part', part);
                ctx.save();
                ctx.beginPath();
                ctx.lineWidth=1;

                const material = part[0];
                const isSelected = index === this.props.currentPartIndex;
                let color = material.color ? material.color : '#ffffff';
                let lineColor = this.blendColors(color, '#363527', 0.8);

                if (isSelected) {
                    color = this.blendColors(color, '#FF0000', 0.3);
                    lineColor = this.blendColors(lineColor, '#FF0000', 0.5);
                }

                ctx.translate(this.offset+(this.clarity*part[2][0]),this.height-this.offset-(this.clarity*part[2][1]));
                ctx.save();
                ctx.strokeStyle = lineColor;
                ctx.fillStyle = color;
                //console.log('x,y', (this.offset+(this.clarity*part[2][0])) + ', ' + (-this.offset+this.height-(this.clarity*part[2][1])));
                ctx.fillRect(0,0, this.clarity*part[1][0], this.clarity*-part[1][1]);
                ctx.strokeRect(0,0, this.clarity*part[1][0], this.clarity*-part[1][1]);
                ctx.restore();
                ctx.closePath();

                ctx.beginPath();
                ctx.save();
                ctx.font = "11px Arial";
                var textColor = '#000000';
                if (isSelected) {
                    textColor = '#FF0000';
                }
                ctx.fillStyle = textColor;
                if (part[1][0] > part[1][1]) {
                    // Print text on wide piece
                    ctx.translate(-(28*textIndex)+this.clarity*part[1][0]/2, -26);
                    ctx.fillText(this.convertInchesToFeet(part[1][0]),0,0);
                } else {
                    // Print text on thin piece
                    ctx.translate(16, -(8*textIndex)-this.clarity*part[1][1]/2);
                    ctx.fillText(this.convertInchesToFeet(part[1][1]),0,0);
                }
                ctx.restore();

                ctx.closePath();
                ctx.restore();

                // ctx.translate(unit[2][0]*3,height-unit[2][1]*3);
                // ctx.rotate(-unit[3]*Math.PI/180);
                textIndex++;
                if (textIndex > 8) {
                    textIndex = 0;
                }
            });
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
                    style={{width: '100%', background: 'transparent'}}
                ></canvas>
            </div>
        );
    }
}