import React from 'react';

import Graph from 'react-graph-vis';

export default class NonLinearCurriculumStudentView extends React.Component {
    
    state = {
        i: 0,
    };
    
    getNetwork = (network) => {
        this.network = network;
        this.focus();
    };

    focus = () => {
        this.network.focus(this.props.currentNode, {scale:0.3});
        this.network.redraw();
    };

    filterValues = (graph) => {
        const filteredGraph = JSON.parse(JSON.stringify(graph));

        filteredGraph.nodes.forEach((node) => {
            node.value = 1;
        });
        filteredGraph.edges.forEach((edge, index) => {
            edge.value = 1;
        });

        return filteredGraph;
    };

    componentWillReceiveProps(nextProps) {
        this.network.setData(this.filterValues(nextProps.graph));
        this.network.focus(this.props.currentNode, {scale:0.3});
        this.network.redraw();
    }

    render() {
        if (!this.props.graph) {
          return (<div></div>);
        }

        this.filteredGraph = this.filterValues(this.props.graph);

        const graph = this.filteredGraph;
        graph.nodes.forEach((node, index) => {
            if (node.id === this.props.currentNode) {
                node.color = '#76ff03';
            } else if (node.complete) {
                node.color = '#00e5ff';
            } else {
                node.color = '#ffffff';
            }
        });
        graph.edges.forEach((edge, index) => {
            let isFromComplete = graph.nodes[edge.from-1].complete;
            let isToComplete = graph.nodes[edge.to-1].complete;
            if (isFromComplete && !isToComplete) {
                edge.color = '#76ff03';
            } else if (edge.from < this.props.currentNode) {
                edge.color = '#00e5ff';
            } else {
                edge.color = '#ffffff';
            }

            edge.value = graph.nodes[edge.to-1].value;
        });

        const options = {
            width: '150px',
            height: '250px',
            nodes: {
                shape: 'dot',
                size: 30,
                font: {
                    size: 26
                },
                borderWidth: 2,
                shadow:true
            },
            edges: {
                width: 3,
                shadow:true,
                arrows: {
                  to: {
                    enabled: false,
                  }
                }
            },
            interaction: {
                dragNodes: false,
                dragView: true,
                zoomView: false,
            },
            physics: {
                enabled: false,
            },
            layout: {
              hierarchical: {
                direction: 'LR',
              }
            },
            groups: {
              main: {font:{size:36}}
            }
        };

        const events = {
            select: (event) => {
                var { nodes, edges } = event;
                if (nodes.length > 0) {
                  this.props.onSelect(nodes[0]);
                }
                // this.setState({
                //   i: this.state.i+1,
                // });
            }
        }

        return (
            <div>
              <Graph key={this.state.i} graph={graph} options={options} events={events} getNetwork={this.getNetwork} />
            </div>
        )
    }
}