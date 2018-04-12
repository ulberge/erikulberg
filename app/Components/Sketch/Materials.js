import React, { Component } from 'react';
import Divider from 'material-ui/Divider';

export default class Materials extends Component {

    calculateMaterials(groupJson) {
        //console.log(json);
        if (groupJson && groupJson.parts) {
            const parts = groupJson.parts;
            let groupMaterials = {};
            parts.forEach((part, index) => {
                const material = part[0];
                let length;
                if (part[1][0] > part[1][1]) { // wide piece
                    length = part[1][0];
                } else { // thin piece
                    length = part[1][1];
                }

                if (groupMaterials[part[0].label]) {
                    if (groupMaterials[part[0].label][length]) {
                        groupMaterials[part[0].label][length] = groupMaterials[part[0].label][length]+1;
                    } else {
                        groupMaterials[part[0].label][length] = 1;
                    }
                } else {
                    let materialMap = {};
                    materialMap[length] = 1;
                    groupMaterials[part[0].label] = materialMap;
                }
            });

            //console.log('groupMaterials', groupMaterials);
            let compiled = {};
            Object.entries(groupMaterials).forEach(([materialKey, materialCuts]) => { // for each material
                let totalLength = 0;
                Object.entries(materialCuts).forEach(([length, numberOfCuts]) => { // for each length of that material
                    totalLength += length * numberOfCuts;
                });

                compiled[materialKey] = {
                    cuts: materialCuts,
                    totalLength: totalLength
                };
            });
            //console.log('groupMaterials: ', JSON.stringify(compiled, null, 2).replace(new RegExp(/'/, 'g'), 'ft').replace(new RegExp(/\\"/, 'g'), 'in').replace(new RegExp(/"/, 'g'), '').replace(new RegExp(/ft/, 'g'), '\'').replace(new RegExp(/in/, 'g'), '"'));
            return compiled;
        }
        return {};
    }

    convertInchesToFeet(l) {
        const ft = Math.floor(l/12);
        const inches = l-(12*ft);
        return ft + '\' ' + inches + '"';
    }

    renderGroupMaterials(groupKey, compiled) {
        return Object.entries(compiled).map(([materialKey, compiled]) => 
            <div key={materialKey} style={{padding: '10px 20px'}}>
                <h4>{materialKey}</h4>
                <div>
                    <b>Total Length:</b>&nbsp;&nbsp;{this.convertInchesToFeet(compiled.totalLength)}
                </div>
                <div>
                    <b>Cuts: </b>
                    {
                        Object.entries(compiled.cuts).map(([length, numberOfCuts]) => 
                            <div key={length}>
                                {this.convertInchesToFeet(parseFloat(length))}&nbsp;&nbsp;x&nbsp;&nbsp;{numberOfCuts}
                            </div>
                        )
                    }
                </div><br/>
            </div>
        );
    }

    renderMaterials() {
        let materials = {};
        let allGroups = {};
        Object.entries(this.props.sketchJson).forEach(([groupKey, groupJson]) => {
            const compiled = this.calculateMaterials(groupJson);
            allGroups[groupKey] = compiled;
        });

        //console.log(Object.entries(materials));
        const allGroupsEntries = Object.entries(allGroups);
        return allGroupsEntries.map(([groupKey, compiled]) => 
            <div style={{margin: '0'}} key={groupKey}>
                <div>
                    <h4 style={{textAlign: 'center', padding: '4px 10px', marginTop: '20px'}}>{ groupKey }</h4>
                    <Divider/>
                </div>
                { this.renderGroupMaterials(groupKey, compiled) }
            </div>
        );
    }
            
    render() {
        return (
            <div 
                style={{padding: '20px 30px 40px'}}
            >
                <h3>Materials</h3>
                <Divider />
                { this.renderMaterials() }
            </div>
        );
    }
}