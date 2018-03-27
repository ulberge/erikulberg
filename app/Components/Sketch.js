import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Slider from 'material-ui/Slider';

import { className } from './Sketch.less';

export default class extends React.Component {

  state = {
    json: JSON.parse(localStorage.getItem('json')) || '',
    generator: '{\ncount: 4,\nvector: [30,0,0],\ntype:\'WOOD\',\nsize:\'[ 84, insideHeight, 0 ]\',\nposition:\'[ 0, 0, 0 ]\',\nrotation:\'[ 0, 0, 0 ]\'\n}',
    generated: '',
    visibility: {},
    sketchJson: {},
    materials: ''
  };

  componentDidMount() {
    const sketch = $('#sketchIframe');
    sketch.width('100%');
    sketch.height('480px');
    $('.iframeOverlap').click(function focusGarden() {
      sketch.focus();
    });

    if (!this.state.json) {
      console.log('loading from file');
      const setJSON = (json) => {
        this.setState({
          json: json
        });
      };
      function reqListener(e) {
        console.log(this.responseText);
        setJSON(this.responseText);
      }
      var req = new XMLHttpRequest();
      req.onload = reqListener;
      req.open("get", "/sketch/default.js", true);
      req.send();
    }
    
    setTimeout(() => this.updateSketchJson(this.state), 1000);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.json !== nextState.json || this.state.generated != nextState.generated) {
      this.updateSketchJson(nextState);
    }
  }

  iframe() {
    return {
      __html: '<iframe id="sketchIframe" src="sketch/shed.html" frameBorder="0" scrolling="no"></iframe>'
    };
  }

  compileJsonCheck = (state) => {
    let isJsonLegal = false;

    try {
      if (state.json) {
        eval('(function(){' + state.json + '})')();
      }
      isJsonLegal = true;
    } catch(error) {
      console.log(error);
    }

    $('.json-tab').css('background', isJsonLegal ? '#5cb85c' : '#d9534f');

    return isJsonLegal;
  };

  compileGeneratedCheck = (state) => {
    let isGeneratedLegal = false;

    try {
      if (state.generated) {
        eval('(function(){' + state.json.replace('return', 'var _ = ') + ' return {' + state.generated + '};})')();
      }
      isGeneratedLegal = true;
    } catch(error) {
      console.log(error);
    }

    $('.generator-tab').css('background', isGeneratedLegal ? '#5cb85c' : '#d9534f');

    return isGeneratedLegal;
  };

  updateSketchJson = (state) => {
    if (!this.compileJsonCheck(state)) {
      return false;
    }

    try {
      let sketchStr = '(function(){' + state.json + '})';
      var sketchJson = eval(sketchStr)();

      if (state.generated && this.compileGeneratedCheck(state)) {
        try {
          console.log('adding generated');
          const evalStr = '(function(){' + state.json.replace('return', 'var _ = ') + ' return {' + state.generated + '}.generated;})';
          sketchJson['generated'] = eval(evalStr)();
        } catch(error) {
          console.log(error);
        }
      }

      this.setState({sketchJson});
    } catch(error) {
      console.log(error);
    }
  };

  saveSketch = () => {
    if (this.state) {
      // save data to local storage
      localStorage.setItem('json', JSON.stringify(this.state.json));
    }
  };

  handleTextChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const newState = {};
    newState[name] = value;
    this.setState(newState);
  };

  handleToggleGroup = (key) => {
    const visibility = Object.assign({}, this.state.visibility);
    if (key in visibility) {
      visibility[key] = !visibility[key];
    } else {
      visibility[key] = false;
    }
    this.setState({visibility});
  };

  generate = () => {
    const input = eval('('+this.state.generator+')');
    const deltaVector = [input.vector[0]/(input.count-1), input.vector[1]/(input.count-1), input.vector[2]/(input.count-1)];

    let generated = 'generated: [[\n';
    for (let x = 0; x < input.count; x++) {
      const position = [deltaVector[0]*x, deltaVector[1]*x, deltaVector[2]*x];
      generated += '['+input.type+','+input.size+',['+position+']],\n';
    }
    generated += '], '+input.position+','+input.rotation+']';
    this.setState({generated});
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
    if (this.state.sketchJson && this.state.visibility) {
      // filter hidden groups based on visibility
      let filteredSketchJson = {};
      Object.keys(this.state.sketchJson).forEach(key => {
        if (this.state.visibility[key] !== false) {
          filteredSketchJson[key] = this.state.sketchJson[key];
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

  unpackGroups(flatList, groups) {
    Object.keys(groups).map(key => {
      const parts = groups[key][0];
      parts.forEach(part => {
        if (Array.isArray(part)) {
          //console.log(part);
          flatList.push(part); // is unit
          return;
        }
        this.unpackGroups(flatList, part);
      });
    });
  }

  getMaterialMap(filteredSketchJson) {
    if (filteredSketchJson) {

      let flatList = [];
      this.unpackGroups(flatList, filteredSketchJson);
      
      let materialMap = {};
      flatList.forEach(unit => {
        var material = unit[0];
        var dimensions = unit[1].slice().sort((a,b) => {return a - b;});
        var id = '' + material.label + dimensions[0] + dimensions[1];
        var length = dimensions[2];

        if (!materialMap[id]) {
          materialMap[id] = {
            material: material,
            dimensions: dimensions,
            length: length,
            cuts: [length]
          };
        } else {
          materialMap[id].length += length;
          materialMap[id].cuts.push(length);
        }
      });
      return materialMap;
    }
    return {};
  }

  getMaterials(materialMap) {
    return Object.keys(materialMap).map(key => {
      const material = materialMap[key];
      return {
        id: key,
        label: material.material.label,
        dimensions: material.dimensions[0] + '" x ' + material.dimensions[1] + '"',
        lengthText: this.convertInchesToFeet(material.length),
        length: material.length
      };
    });
  }

  convertInchesToFeet(l) {
    const ft = Math.floor(l/12);
    const inches = l-(12*ft);
    return ft + '\' ' + inches + '"';
  }

  getCutList(lumberLength, slop, cutList) {
    let lumber = [];
    cutList.forEach(piece => {
      if (piece > lumberLength) {
        console.log('Error: Piece too long!');
      }
      const pieceLength = piece + slop;

      // try to find lumber with remaining space
      for (let i = 0; i < lumber.length; i++) {
        let currentLumber = lumber[i];
        if (currentLumber.remaining >= pieceLength) {
          currentLumber.pieces.push(piece);
          currentLumber.remaining -= pieceLength;
          return;
        }
      }

      lumber.push({
        pieces: [piece],
        remaining: lumberLength-pieceLength
      });
    });

    return lumber;
  }

  getCutLists(materialMap) {
    var cutLists = []
    Object.keys(materialMap).map(key => {
      const material = materialMap[key];
      const cutList = this.getCutList(96, 2, material.cuts);
      let waste = 0;
      cutList.forEach(cut => waste+=cut.remaining);
      cutLists.push({
        material: material,
        numBoards: cutList.length,
        waste: waste
      })
    })
    return cutLists;
  }

  render() {
    this.saveSketch();
    const filteredSketchJson = this.updateSketch();
    const materialMap = this.getMaterialMap(filteredSketchJson);
    var materials = this.getMaterials(materialMap);
    var cutLists = this.getCutLists(materialMap);

    return (
      <div className={classnames(className, 'container-fluid projectPage')}>
        <MuiThemeProvider>
          <div className="container-fluid">
            <div className="detailPageHeader">
              <h2>
                Sketch&nbsp;&nbsp;<small>2017</small>
              </h2>
            </div>
            <div className="row">
              <div className="col-md-5">
                <Tabs className="tabs">
                  <Tab label="JSON" className="json-tab">
                    <TextField 
                        value={this.state.json}
                        name="json"
                        onChange={this.handleTextChange}
                        style={{width: '100%', fontSize: '14px'}}
                        multiLine={true}
                        rows={21}
                        rowsMax={21}
                    />
                  </Tab>
                  <Tab label="Generator" className="generator-tab">
                    <TextField 
                        value={this.state.generator}
                        name="generator"
                        onChange={this.handleTextChange}
                        style={{width: '100%', fontSize: '14px'}}
                        multiLine={true}
                        rows={8}
                        rowsMax={8}
                    />
                    <RaisedButton label="Generate" onClick={this.generate} />
                    <TextField 
                        value={this.state.generated}
                        name="generated"
                        onChange={this.handleTextChange}
                        style={{width: '100%', fontSize: '14px'}}
                        multiLine={true}
                        rows={12}
                        rowsMax={12}
                    />
                  </Tab>
                  <Tab label="Materials" className="materials-tab">
                    <div>
                      <table style={{width: '100%', margin: '10px'}}>
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Dimensions</th>
                            <th>Total</th>
                            <th>Board Len</th>
                            <th># Boards</th>
                            <th>Waste</th>
                          </tr>
                        </thead>
                        <tbody>
                        {materials ? materials.map((material, index) => 
                          <tr key={material.id} style={{padding: '2px 0'}}>
                            <td>{material.label}</td>
                            <td>{material.dimensions}</td>
                            <td>{this.convertInchesToFeet(material.length)}</td>
                            <td><Slider
                                min={0}
                                max={100}
                                step={1}
                                value={50}
                              /></td>
                            <td style={{textAlign: 'center'}}>{cutLists[index].numBoards}</td>
                            <td>{this.convertInchesToFeet(cutLists[index].waste)}
                              </td>
                          </tr>
                        ) : null}
                        </tbody>
                      </table>
                    </div>
                  </Tab>
                </Tabs>
              </div>
              <div className="col-md-7 iframeContainer clearFix">
                <div dangerouslySetInnerHTML={ this.iframe() } />
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  { this.state.sketchJson  ? 
                    Object.keys(this.state.sketchJson).map(key => this.renderChip(key))
                    : null
                  }
                </div>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}