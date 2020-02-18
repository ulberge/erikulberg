import React from 'react';
import classnames from 'classnames';
import { className } from './KernelTuner.less';
import Popover from 'material-ui/Popover';

const imgSectionStyle = {
  textAlign: 'center',
  margin: '40px 0'
};

// const HtmlTooltip = (
//   <Tooltip tooltip={{
//     backgroundColor: '#e0e0e0',
//     maxWidth: 300,
//     fontSize: '16px',
//     border: '1px solid #b2b2b2',
//     color: '#000',
//     borderRadius: 0,
//     padding: '10px'
//   }}
//   />
// );

const citationsKernelTuner = [
  '[1] J. P. Jones and L. A. Palmer, “An evaluation of the two-dimensional Gabor filter model of simple receptive fields in cat striate cortex,” Journal of neurophysiology, vol. 58, no. 6, pp. 1233–1258, 1987.',
  '[2] R. Mehrotra, K. R. Namuduri, and N. Ranganathan, “Gabor filter-based edge detection,” Pattern recognition, vol. 25, no. 12, pp. 1479–1494, 1992.',
  '[3] J. Wang, Z. Zhang, C. Xie, V. Premachandran, and A. Yuille, “Unsupervised learning of object semantic parts from internal states of CNNs by population encoding,” arXiv:1511.06855 [cs], Nov. 2016.',
  '[4] K. Greff, R. K. Srivastava, and J. Schmidhuber, “Highway and Residual Networks learn Unrolled Iterative Estimation,” arXiv:1612.07771 [cs], Mar. 2017.',
  '[5] C. Olah, A. Mordvintsev, and L. Schubert, “Feature Visualization,” Distill, vol. 2, no. 11, p. e7, Nov. 2017, doi: 10.23915/distill.00007.',
  '[6] Q. Yu, Y. Yang, F. Liu, Y.-Z. Song, T. Xiang, and T. M. Hospedales, “Sketch-a-net: A deep neural network that beats humans,” International journal of computer vision, vol. 122, no. 3, pp. 411–425, 2017.',
  '[7] I. Shafkat, “Intuitively Understanding Convolutions for Deep Learning,” Medium, 07-Jun-2018. [Online]. Available: https://towardsdatascience.com/intuitively-understanding-convolutions-for-deep-learning-1f6f42faee1. [Accessed: 07-Feb-2020].',
  '[8] E. Ulberg, “Visual Concepts in Sketch-A-Net,” Dec-2019. [Online]. Available: https://ulberge.github.io/SketchANetClustering/.',
  '[9] C. Rudin and J. Radin, “Why Are We Using Black Box Models in AI When We Don’t Need To? A Lesson From An Explainable AI Competition,” doi: 10.1162/99608f92.5a8a3a3d.'
];

const tooltipStyle = {
  width: '300px',
  background: '#BEBDBD',
  color: '#222',
  padding: '8px',
  border: '1px solid #3a3a3a',
  fontSize: '16px'
};

class Citation extends React.Component {
  state = {
    open: false
  }

  render() {
    return (
      <span style={{ position: 'relative' }}>
        <button
          ref="anchor"
          style={{ padding: 0, minWidth: 0, height: 0, border: 0, fontSize: '12px' }}
          onClick={() => this.setState({ open: !this.state.open })}
        >
          <span style={{ color: '#1f7e9b' }}>[{this.props.i}]</span>
        </button>
        <Popover
          style={tooltipStyle}
          className="hover"
          animated={false}
          open={this.state.open}
          anchorEl={this.refs.anchor}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={() => this.setState({ open: false })}
        >
          <span>{this.props.citation}</span>
        </Popover>
      </span>
    );
  }
}

function citationGenerator(citations) {
  const fns = citations.map((citation, i) => () => <Citation citation={citation} i={i + 1} />);
  return i => fns[i - 1]();
}

export default function KernelTuner() {
  const cite = citationGenerator(citationsKernelTuner);

  return (
    <div className={classnames(className, 'container-fluid projectPage')}>
      <div className="container">
        <div className="detailPageHeader">
          <h2>
            Kernel Tuner&nbsp;&nbsp;<small>2020</small>
          </h2>
          <div>Crafting human-comprehensible kernels for the first layer of a convolutional neural network</div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p><b>Description</b>:</p>
            <p>The <b>Kernel Tuner</b> is a parametric tool that produces evenly distributed, human-interpretable kernels for detecting important features in line drawings. It was built as part of a <a href="/#/thesis">Master's Thesis</a> at Carnegie Mellon University. Overall, the thesis focuses on manually crafting the internal weights of a convolutional neural network (CNN) to make line drawings. This tool provides the kernels that act as the foundational layer for those networks.</p>
            <p>(<i>Note: A “kernel” is a 2D matrix of weights. A “filter” is a stack of kernels, with one kernel for each input channel. Since the first layer of a black and white image has only one channel, each filter has one kernel and the terms are interchangeable.</i>)</p>
            <p><b>Technologies</b>: TensorFlow.js, ReactJS, Material-UI, p5.js</p>
            <p><b>Demo</b>: <a href="https://ulberge.github.io/interactive-network" target="_blank">https://ulberge.github.io/interactive-network</a></p>
            <p><b>Code</b>: <a href="https://github.com/ulberge/interactive-network" target="_blank">github.com/ulberge/interactive-network</a></p>
          </div>
          <div className="col-md-6">
            <div style={{ margin: '30px' }}>
              <div className="imgContainer text-center">
                <img src={"./imgs/thesis/kerneltuner.gif"} />
              </div>
              <small className="text-left">The kernels match interesting features in a line drawing.</small>
              <div className="imgContainer text-center">
                <img src={"./imgs/thesis/kernelinspector.gif"} />
              </div>
              <small className="text-left">The tool visualizes how kernels interact with line drawings.</small>
            </div>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <h3 className="text-center">Background</h3>
            <h4>Making kernels for a CNN</h4>
            <p>What should the first layer of kernels in a convolutional neural network look like? Previous research has demonstrated the effectiveness of Gabor filters {cite(6)}. Gabor filters are kernels created using a Gaussian function applied to a sine wave {cite(2)}. They are useful for edge detection (or in this case, line detection) and provide similar performance to the receptive fields in our visual system {cite(1)}. Therefore, the Kernel Tuner uses Gabor filters as the basis of its approach.</p>

            <div style={imgSectionStyle}>
              <img
                src="./imgs/tuner/gaborplus2.jpg" alt="kernels in Sketch-A-Net"
                style={{ height: '150px', marginRight: '20px' }}
              />
              <img
                src="./imgs/tuner/gaborplus.jpg" alt="Gabor filters"
                style={{ height: '150px' }}
              />
              <div style={{ textAlign: 'center' }}>
                <small>(1) A bank of Gabor filters at different sizes and rotations to match edges/lines of different widths and textures {cite(6)}. (2) Sample of kernels from the first layer of Sketch-A-Net, a state-of-the-art line drawing CNN {cite(6)}.</small>
              </div>
            </div>

            <p>One concern with generating the weights of the kernels parametrically (as opposed to a training process such as gradient descent) is that we could easily miss features that are useful for classification. Patterns spread across vast troves of data can be easier to detect for computers cranking out billions of calculations per second than for a human thumbing through images one-by-one. If we let the machine shape the kernels through training, we can avoid human mistakes.</p>

            <p>However, there are benefits to exercising human control. The Kernel Tuner creates kernels that are well distributed and human-comprehensible. The Gabor-like filters formed computationally through training are messy. They are offset and incomplete. It is unclear how they are distributed or whether they are overfit. On the other hand, the Kernel Tuner produces kernels that are evenly spaced by angle and that correspond to visual concepts with names such as 'lines', 'corners', and 'intersections.'</p>

            <div style={imgSectionStyle}>
              <img
                src="./imgs/tuner/ws.png" alt="Sketch-A-Net first layer kernels"
                style={{ height: '200px', marginRight: '40px' }}
              />
              <img
                src="./imgs/tuner/ktkernels.png" alt="Kernel Tuner first layer kernels"
                style={{ height: '200px' }}
              />
              <div style={{ textAlign: 'center' }}>
                <small>(1) The first layer kernels in Sketch-A-Net {cite(6)}. (2) Kernels produced with the Kernel Tuner matching lines, line ends, corners, T-intersections, X-intersections, Y-intersections, points, open corners, dots, fields, and individual pixels.</small>
              </div>
            </div>

            <p>The goal of the Kernel Tuner is to replace the machine-trained kernels in the first layer of a CNN. The kernels can be exported from the tool and inserted as fixed, pretrained weights. By crafting them ourselves, we can ensure their even distribution and match them to human-comprehensible visual concepts.</p>

            <h4>Abstraction through Convolution</h4>

            <p>The Kernel Tuner produces kernels that translate an image from pixel values to higher order features. It does this through a process called <i>convolution</i> in which the kernels are applied as a sliding window across an image. After these kernels are convolved, each pixel location is given more meaningful names like “vertical line” or “corner facing down and right.” By pulling out this information, we can interact with the canvas at a higher level of abstraction.</p>

            <div style={imgSectionStyle}>
              <img
                src="./imgs/tuner/name3.png" alt="6 kernels for a box line drawing"
                style={{ height: '150px', marginRight: '40px' }}
              />
              <img
                src="./imgs/tuner/slidingwindow.gif" alt="sliding window animation for convolutions"
                style={{ height: '150px', marginRight: '40px' }}
              />
              <img
                src="./imgs/tuner/name2.png" alt="line drawing of a box"
                style={{ height: '150px', marginBottom: '0px', marginRight: '40px' }}
                className="noSmooth"
              />
              <img
                src="./imgs/tuner/name0.png" alt="graphics of max activations for a box line drawing"
                style={{ height: '150px' }}
              />
              <div style={{ textAlign: 'center' }}>
                <small>(1) The set of kernels applied as a sliding window. (2) The process of convolution {cite(7)}. (3) An image before convolution. (4) The maximum activations from convolution.</small>
              </div>
            </div>

            <p>CNNs use convolution to classify images as abstract entities. The prevailing wisdom is that each layer of a network produces a higher order of information than the previous layer {cite(5)}. This may or may not be the case, but it is at least a useful starting point for thinking about how networks learn {cite(4)}.</p>

            <p>At the first layer, kernels function as templates. They can have some tolerance, but they match a narrow range of pixel arrangements. After multiple layers, the kernels no longer correspond to templates. The network can begin to match different scales, rotations, or individual expressions of an object. It should be noted that if something can be matched with a template, it requires only one layer of convolution. If an object is abstract (i.e. it can take a variety of forms), then the network must flexibly encode the visual concept through multiple layers.</p>

            <div style={imgSectionStyle}>
              <img
                src="./imgs/tuner/match2.png" alt="line drawing of a corner"
                style={{ height: '80px' }}
              />
              <img
                src="./imgs/tuner/match0.png" alt="6 kernel overlays of corner line drawing"
                style={{ height: '80px' }}
              />
              <div style={{ textAlign: 'center' }}>
                <small>(1) Kernels overlaid on a corner.</small>
              </div>
            </div>

            <h4>Construction of Kernels</h4>

            <p>The patterns for the kernels produced by the Kernel Tuner are inspired by Gabor filters. Typically, Gabor filters are applied at various sizes. This tool is designed to work with line drawings of a consistent stroke width and therefore provides a single size. In addition, this tool produces filters with three ridges (one positive flanked by two negative). Gabor filters have multiple ridges to match textures in addition to lines. For simplicity's sake, this project ignores textures and focuses on detecting line features.</p>

            <div style={imgSectionStyle}>
              <img
                src="./imgs/tuner/func0.png" alt="1D Gabor filter"
                style={{ height: '100px', marginRight: '20px' }}
              />
              <img
                src="./imgs/tuner/gabor1.jpg" alt="vertical Gabor filter"
                style={{ height: '100px', marginRight: '20px' }}
              />
              <img
                src="./imgs/tuner/gaborme.png" alt="vertical line filter generated with tuner"
                style={{ height: '100px' }}
              />
              <div style={{ textAlign: 'center' }}>
                <small>(1) A 1D Gabor filter (blue) combines a sine wave (red) and a Gaussian/normal distribution (green). (2) Vertical Gabor filter. (3) Vertical line filter generated with Kernel Tuner.</small>
              </div>
            </div>

            <p>The other important difference between the output of the Kernel Tuner and Gabor filters is the range of features matched. Instead of being limited to lines of different orientations, the kernels produced by this tool can match a range of feature types. Normally, networks take their time to build up these representations. In an investigation of representations within Sketch-a-Net, I found that the first layer matched line orientations and layers two through four haphazardly refined features such as corners, rounded corners, dots, curves, and a variety of textures {cite(8)}.</p>


            <div style={imgSectionStyle}>
              <img
                src="./imgs/tuner/kerneltypes.png" alt="sample of line filters generated with tuner"
                style={{ height: '100px', marginBottom: '25px' }}
              />
              <img
                src="./imgs/tuner/viz0.png" alt="Sketch-A-Net layer 1 visual concepts"
                style={{ maxWidth: '500px', width: '70%' }}
              />
              <img
                src="./imgs/tuner/viz1.png" alt="Sketch-A-Net layer 2 visual concepts"
                style={{ maxWidth: '500px', width: '70%' }}
              />
              <div style={{ textAlign: 'center' }}>
                <small>(1) Other types of kernels generated with the Kernel Tuner. (2-3) Illustrations of visual concepts in Layers 1 and 2 in Sketch-A-Net. These concepts were found using a K-Means clustering approach borrowed from {cite(3)}. More can be seen <a href="https://ulberge.github.io/SketchANetClustering/">here</a>.</small>
              </div>
            </div>

            <p>The kernel types chosen span the range of possibilities from one, two, or three lines passing through the center of the kernel. In Sketch-A-Net, there are additionally kernels matching lines that do not pass through their center. I chose to exclude these offset filters to reduce the size of the network. The goal of the Kernel Tuner is to efficiently extract the most salient, “template”-like information available. The layers built on top of these kernels can push further.</p>

            <div style={imgSectionStyle}>
              <img
                src="./imgs/tuner/linetypes.png" alt="The one, two, and three line constructions considered"
                style={{ height: '200px', filter: 'grayscale()', marginRight: '40px' }}
              />
              <img
                src="./imgs/tuner/stitch.png" alt="The ‘L’ corner is made by stitching perpendicular Gabor filters along a diagonal a 45 degree angle"
                className="noSmooth"
                style={{ height: '100px', marginBottom: '50px' }}
              />
              <div style={{ textAlign: 'center' }}>
                <small>(1) The one, two, and three line constructions considered. (2) Each kernel is a Frankenstein of Gabor filters corresponding to the lines involved. The ‘L’ corner is made by stitching together two Gabor filters at an angle.</small>
              </div>
            </div>

            <h4>Example Usage</h4>
            <p>How is the Kernel Tuner used?</p>
            <p>Let’s say I care about line drawings of boxes. First, I might draw a box in the test area. A box is made up of lines and corners. So, I would select the line and corner types. This yields kernels that match the elements of a box. When applied to the drawing, the six kernels neatly label the parts of the box.</p>

            <div style={imgSectionStyle}>
              <img
                src="./imgs/tuner/scrn0.png" alt="Kernel Tuner screenshot of making kernels"
                style={{ height: '150px', marginRight: '20px' }}
              />
              <img
                src="./imgs/tuner/name3.png" alt="6 Kernels"
                style={{ height: '150px', marginRight: '20px' }}
              />
              <img
                src="./imgs/tuner/box.png" alt="a box drawing"
                style={{ height: '120px', marginBottom: '15px' }}
              />
              <img
                src="./imgs/tuner/names0.png" alt="Activations (0) for box"
                style={{ height: '100px', marginBottom: '25px' }}
              />
            </div>

            <p>Adjusting the size of the kernels, the width of the sine wave or the radius of the 2D Gaussian changes the character of the kernels. The different kernels yield different readings of the same box.</p>

            <div style={imgSectionStyle}>
              <img
                src="./imgs/tuner/k04.png" alt="Sample kernels with different settings"
                style={{ height: '100px', marginRight: '20px' }}
              />
              <img
                src="./imgs/tuner/out1.png" alt="thin output"
                style={{ height: '75px', marginBottom: '12px' }}
              />
              <img
                src="./imgs/tuner/out2.png" alt="med output"
                style={{ height: '75px', marginBottom: '12px' }}
              />
              <img
                src="./imgs/tuner/out4.png" alt="thick output"
                style={{ height: '75px', marginBottom: '12px' }}
              />
              <div style={{ textAlign: 'center' }}>
                <small>(1) Different kernels that can be produced. (2) A variety of activation outputs.</small>
              </div>
            </div>

            <p>The tool can also be used to check how robust the kernels are to rotation. A slider rotates the images and recalculates the activations in real time.</p>

            <div style={imgSectionStyle}>
              <img
                src="./imgs/tuner/rot.png" alt="Kernel Tuner screenshot of rotation"
                style={{ height: '300px' }}
              />
            </div>

            <p>The square above is no longer well matched to the kernels generated. There are blank spaces and poorly matched labels along the lines. To help diagnose what is going wrong, the tool provides information when the user hovers over a location. When the user clicks on a location, the tool shows a chart of its top activations and what the kernels look like as overlays at that point.</p>

            <div style={imgSectionStyle}>
              <img
                src="./imgs/tuner/selection.png" alt="Kernel Tuner screenshot of selection"
                style={{ height: '300px' }}
              />
            </div>

            <p>After inspection, we can see that our filters are quite relaxed. The corner is matching a corner at a different angle with high activation. We may want this, or we may want to increase the size of the Gaussian to make the filters more strict. Additionally, we can increase the angle setting to ‘4’ to better match the corner.</p>

            <div style={imgSectionStyle}>
              <img
                src="./imgs/tuner/angles4.png" alt="Kernel Tuner screenshot of more angles provided"
                style={{ height: '300px' }}
              />
            </div>

            <p>Now we have a set of kernels that accurately label the parts of a box and multiple angles. If we use these kernels as the first layer weights in a CNN, we can built a network that recognizes boxes.</p>

            {/* <h4>Head-to-head comparison with first layer kernels in machine learning</h4>
            <p>To verify that these kernels encode sufficient information to act as a foundation for robust networks, I built models on top of them. Then, I compared the classification accuracy with other approaches. I tested models with the kernels as the fixed, pre-trained weights and compared them with models using random, trainable weights. For this experiment, I used the TU Berlin sketch dataset, augmented through shifting the images and through slight shear, zoom, and rotational transformations. I also compare the results to state-of-the-art approaches.</p>

            <h4>Test #1</h4>
            <p>The first network I built was designed to classify using simple statistics built on top of the Kernel Tuner filters. My hope was to establish a baseline of how much information was being extracted through just the kernels. The network pools the information and uses a fully connected layer before the final softmax layer to calculate statistics.</p>

            <div style={imgSectionStyle}>
              <img
                src="./imgs/tuner/stats.png" alt="Model summary for Test #1 of stats on top of kernels"
                style={{ height: '300px' }}
              />
              <div style={{ textAlign: 'center' }}>
                <small>(1) Model summary for Test #1 of statistics on top of kernels.</small>
              </div>
            </div>

            <h4>Test #2</h4>
            <p>Secondly, I built a shallow CNN on top of the kernels to see how they would compare to a network without pretrained weights and to state of the art results on the same dataset. While this network has over 3 million trainable weights, it is still considerably smaller than the 8.5 million of Sketch-A-Net {cite(6)}</p>

            <div style={imgSectionStyle}>
              <img
                src="./imgs/tuner/conv.png" alt="Model summary for Test #2 of shallow CNN on top of kernels"
                style={{ height: '500px' }}
              />
              <div style={{ textAlign: 'center' }}>
                <small>(1) Model summary for Test #2 of shallow CNN on top of kernels.</small>
              </div>
            </div>

            <h4>Results</h4>
            <p>My preliminary results show a % for the shallow statistical network and % for the shallow CNN. When I replaced the kernels with random weights the results were % and % respectively. Sketch-A-Net achieved %, although with more weights and a more complex model. I would argue that the use of kernels also improved the generalizability since there was a concerted approach to have a well distributed set of features recognized.</p>*/}

            <h4>Conclusion</h4>
            <p>The Kernel Tuner provides a way to manually craft kernels for extracting salient features from line drawings. It acts as a visual debugger to aid their creation. The output can be used as the filters in the first layer of a line drawing CNN.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
