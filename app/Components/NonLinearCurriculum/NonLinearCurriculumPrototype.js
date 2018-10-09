import React from 'react';

import Graph from 'react-graph-vis';
import classnames from 'classnames';
import NonLinearCurriculumStudentView from './NonLinearCurriculumStudentView';
import NonLinearCurriculumTeacherView from './NonLinearCurriculumTeacherView';

import { className } from './NonLinearCurriculumPrototype.less';

export default class NonLinearCurriculumPrototype extends React.Component {

    state = {
        currentNode: 2,
        i: 0,
        graph: {
            nodes: [
              {id: 1, label: 'Node 1', value: 1, level: 1, complete: true},
              {id: 2, label: 'Node 2', value: 5, level: 2, complete: true},
              {id: 3, label: 'Node 3', value: 1, level: 3},
              {id: 4, label: 'Node 4', value: 1, level: 4},
              {id: 5, label: 'Node 5', value: 1, level: 5},
              {id: 6, label: 'Node 2.1', value: 7, level: 3},
              {id: 7, label: 'Node 2.2', value: 1, level: 3},
              {id: 8, label: 'Node 2.3', value: 2, level: 3},
              {id: 9, label: 'Node 3.1', value: 1, level: 4},
              {id: 10, label: 'Node 3.2', value: 1, level: 4},
              {id: 11, label: 'Node 3.3', value: 1, level: 4},
              {id: 12, label: 'Node 1.1', value: 3, level: 2, complete: true},
              {id: 13, label: 'Node 1.2', value: 2, level: 2},
            ],
            edges: [
              {from: 1, to: 2},
              {from: 1, to: 12},
              {from: 1, to: 13},
              {from: 2, to: 3},
              {from: 3, to: 4},
              {from: 4, to: 5},
              {from: 2, to: 6},
              {from: 2, to: 7},
              {from: 2, to: 8},
              {from: 3, to: 9},
              {from: 3, to: 10},
              {from: 3, to: 11},
            ]
        },
    };

    goTo = (nodeId) => {
        this.state.graph.nodes[nodeId-1].complete = true;
        this.setState({
            currentNode: nodeId,
            graph: this.state.graph,
            i: this.state.i+1,
        });
    };

    vote = (nodeId) => {
        let currentVotes = this.state.graph.nodes[nodeId-1].value;
        this.state.graph.nodes[nodeId-1].value = currentVotes+1;
        this.setState({
            graph: this.state.graph,
            i: this.state.i+1,
        });
    };

    render() {

        return (
            <div className={classnames(className)}>
                <div className="phones">
                    <div style={{'float': 'left'}}>
                        <h2>Students</h2>
                        <div>
                            <div className="studentPhone">
                                <NonLinearCurriculumStudentView
                                    key={this.state.i}
                                    graph={this.state.graph}
                                    currentNode={this.state.currentNode}
                                    onSelect={this.vote}
                                />
                            </div>
                            <div className="studentPhone">
                                <NonLinearCurriculumStudentView
                                    key={this.state.i}
                                    graph={this.state.graph}
                                    currentNode={this.state.currentNode}
                                    onSelect={this.vote}
                                />
                            </div>
                            <div className="studentPhone">
                                <NonLinearCurriculumStudentView
                                    key={this.state.i}
                                    graph={this.state.graph}
                                    currentNode={this.state.currentNode}
                                    onSelect={this.vote}
                                />
                            </div>
                            <div className="studentPhone">
                                <NonLinearCurriculumStudentView
                                    key={this.state.i}
                                    graph={this.state.graph}
                                    currentNode={this.state.currentNode}
                                    onSelect={this.vote}
                                />
                            </div>
                            <div className="studentPhone">
                                <NonLinearCurriculumStudentView
                                    key={this.state.i}
                                    graph={this.state.graph}
                                    currentNode={this.state.currentNode}
                                    onSelect={this.vote}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="studentPhone">
                                <NonLinearCurriculumStudentView
                                    key={this.state.i}
                                    graph={this.state.graph}
                                    currentNode={this.state.currentNode}
                                    onSelect={this.vote}
                                />
                            </div>
                            <div className="studentPhone">
                                <NonLinearCurriculumStudentView
                                    key={this.state.i}
                                    graph={this.state.graph}
                                    currentNode={this.state.currentNode}
                                    onSelect={this.vote}
                                />
                            </div>
                            <div className="studentPhone">
                                <NonLinearCurriculumStudentView
                                    key={this.state.i}
                                    graph={this.state.graph}
                                    currentNode={this.state.currentNode}
                                    onSelect={this.vote}
                                />
                            </div>
                            <div className="studentPhone">
                                <NonLinearCurriculumStudentView
                                    key={this.state.i}
                                    graph={this.state.graph}
                                    currentNode={this.state.currentNode}
                                    onSelect={this.vote}
                                />
                            </div>
                            <div className="studentPhone">
                                <NonLinearCurriculumStudentView
                                    key={this.state.i}
                                    graph={this.state.graph}
                                    currentNode={this.state.currentNode}
                                    onSelect={this.vote}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{'float': 'right'}}>
                        <h2>Teacher</h2>
                        <div className="phone">
                            <NonLinearCurriculumTeacherView
                                key={this.state.i}
                                graph={this.state.graph}
                                currentNode={this.state.currentNode}
                                onSelect={this.goTo}
                                updateFocusOnClick={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
