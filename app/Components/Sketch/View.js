import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import Designer2D from './Designer2D';
import Designer3D from './Designer3D';
import Designer from './Designer';

export default class View extends React.Component {

    // shouldComponentUpdate() {
    //     if (this.recentUpdate) {
    //         return false;
    //     } else {
    //         this.recentUpdate = true;
    //         setTimeout(() => this.recentUpdate = false, 100);
    //         return true;
    //     }
    // }

    render() {
        console.log('Rerender View');

        return (
            <Paper>
                <Designer 
                    sketchJson={this.props.sketchJson}
                />
            </Paper>
        )

        // return (
        //     <Paper>
        //         /*<Tabs initialSelectedIndex={1}>
        //             <Tab label="2D Designer" >
        //                 <div>
        //                     <Designer2D 
        //                         sketchJson={this.props.sketchJson}
        //                         currentGroupKey={this.props.currentGroupKey}
        //                         currentPartIndex={this.props.currentPartIndex}
        //                         //onViewSelect={this.props.onViewSelect}
        //                         //handleSelectGroup={this.props.handleSelectGroup}
        //                     />
        //                 </div>
        //             </Tab>
        //             <Tab label="3D Designer" >
        //                 <div>
        //                     <Designer3D 
        //                         sketchJson={this.props.sketchJson}
        //                         currentGroupKey={this.props.currentGroupKey}
        //                         currentPartIndex={this.props.currentPartIndex}
        //                         //onViewSelect={this.props.onViewSelect}
        //                     />
        //                 </div>
        //             </Tab>
        //         </Tabs>
        //     </Paper>
        // )
    }
}