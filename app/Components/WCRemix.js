import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './WCRemix.less';

export default class extends Component {
  render() {
    return (
        <div className={classnames(className, 'container-fluid projectPage')}>
          <div className="container">
            <div className="detailPageHeader">
              <h2>
                Watercolor Collage Toolkit&nbsp;&nbsp;<small>2017</small>
              </h2>
              <div>Machine Learning, <a href="http://www.wekinator.org/">Wekinator</a>, Processing</div>
            </div>

            <div className="row">
              <p className="col-md-4">Watercolor is hard, and happy accidents make the best paintings. What if I could make a painting that was all happy accidents by using collage? Below are two tools for processing watercolor images to allow me to iterate on sections separately.</p>
              <div className="col-md-7 col-md-offset-1">
                <div className="col-md-4 text-center" style={{ paddingTop: '20px' }}>
                  <img src="./imgs/wc_montage.png" />
                  <small>Individual Watercolor Paintings</small>
                </div>
                <div className="col-md-4 text-center" style={{ paddingTop: '0px' }}>
                  <img className="col-md-8 col-md-offset-2" src="./imgs/wc_croptool.jpg" style={{ paddingBottom: '0px' }}/>
                  <img className="col-md-8 col-md-offset-2" src="./imgs/wc_transtool.jpg" style={{ paddingBottom: '0px' }}/>
                  <small className="col-md-12">Digital Collage Tools</small>
                </div>
                <div className="col-md-4 text-center" style={{ paddingTop: '60px' }}>
                  <img src="./imgs/wc_composite.jpg" />
                  <small>Collage</small>
                </div>
              </div>
            </div>
          </div>
          <div className="accentRow row text-center">
            <div className="container">
              <div className="col-md-6">
                <h3>Crop Tool</h3>
                <p>This tool uses a neural network in Wekinator to convert blank watercolor paper to transparency. A user can drag and drop hand-cropped examples to train the tool, and then run it on other images.</p>
                <img className="col-md-10 col-md-offset-1 screenShot" src="./imgs/wc_croptool.jpg" />
              </div>
              <div className="col-md-6">
                <h3>Transparency Tool</h3>
                <p>This tool uses a neural network in Wekinator to convert colors to a transparent version while maintaining the color value over a white background. I built this as a way to learn how to train a machine learning program in Wekinator. There is surely a better way to map colors to transparent versions by reverse engineering the exact algorithm used by the graphics engine.</p>
                <img className="col-md-8 col-md-offset-2 screenShot" src="./imgs/wc_transtool.jpg" />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <h3 className="text-center">Training</h3>
              <div className="col-md-6">
                <h4>Program for training machine learning tool</h4>
                <img className="screenShot" src="./imgs/wc_trainer.jpg" />
              </div>
              <div className="col-md-6">
                <h4>Results from testing different methods</h4>
                <img className="screenShot" src="./imgs/wc_chart2.jpg" />
              </div>
            </div>
          </div>
        </div>
    );
  }
}
