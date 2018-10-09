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
        isRunning: false,
        graph: {
            nodes: [
              {id: 1, label: 'Databases', value: 1, level: 1, complete: true, group: 'main'},
              {id: 2, label: 'Types', value: 5, level: 2, complete: true, group: 'main'},
              {id: 3, label: 'Queries', value: 1, level: 3, group: 'main'},
              {id: 4, label: 'Indexes', value: 1, level: 4, group: 'main'},
              {id: 5, label: 'HW', value: 1, level: 5, group: 'main'},
              {id: 6, label: 'Relational (SQL)', value: 7, level: 3},
              {id: 7, label: 'Non-Relational (NoSQL)', value: 1, level: 3},
              {id: 8, label: 'Excel', value: 2, level: 3},
              {id: 9, label: 'SELECT', value: 1, level: 4},
              {id: 10, label: 'JOINS', value: 1, level: 4},
              {id: 11, label: 'EXPLAIN', value: 1, level: 4},
              {id: 12, label: 'History', value: 3, level: 2, complete: true},
              {id: 13, label: 'Current Trends', value: 2, level: 2},
            ],
            edges: [
              {from: 1, to: 2},
              {from: 1, to: 12},
              //{from: 1, to: 13},
              {from: 2, to: 3},
              {from: 3, to: 4},
              {from: 4, to: 5},
              {from: 2, to: 6},
              {from: 2, to: 7},
              {from: 2, to: 8},
              {from: 3, to: 9},
              {from: 3, to: 10},
              {from: 3, to: 11},
              {from: 12, to: 13},
              {from: 13, to: 1},
              {from: 6, to: 7},
              {from: 7, to: 8},
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
            //i: this.state.i+1,
        });
    };

    componentDidMount() {
        this.isRunning = false;

        document.addEventListener('keypress', (event) => {
          const keyName = event.key;
          if (!this.isRunning) {
            this.isRunning = true;

            console.log('is running');
            const addVotes = () => {
                this.addVotesTimeout = setTimeout(() => {
                    this.state.graph.nodes.forEach((node, index) => {
                        if (index > 4 && index % 2 === 0) {
                            return;
                        }
                        if ((Math.floor((Math.random() * this.state.graph.nodes.length) + 1)) === node.id &&
                            !node.complete) {
                            console.log(node.id);
                            node.value = node.value + 1;
                        }
                    });
                    this.setState({
                        graph: this.state.graph,
                    });
                    addVotes();
                }, 100);
            }
            addVotes();
            
          } else {
            this.isRunning = false;
            if (this.addVotesTimeout) {
                clearTimeout(this.addVotesTimeout);
            }
            console.log('is not running');
          }

        });
    }

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
