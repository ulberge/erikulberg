var nodeExternals = require('webpack-node-externals');

module.exports = {
  noParse: /highlight\.js\/lib\/languages\/.*\.js/,
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
  loaders: [{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
  }, {
    test: /\.json$/,
    loader: 'json'
  }, {
    test: /\.css$/,
    loader: 'style!css'
  }, {
    test: /\.less$/,
    loader: 'style!css?localIdentName=[path][name]---[hash:base64:5]!less'
  }, {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url?limit=10000&minetype=application/font-woff'
  },
  {
    test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file'
  },
  {
    test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
    loader: 'imports?define=>false&this=>window'
  }]
};