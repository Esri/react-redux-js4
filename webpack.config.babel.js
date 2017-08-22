const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080/', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    // 'webpack-hot-middleware/client?http://localhost:8080/',
    './dist/main.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'bundle.js',
    chunkFilename: '[id].bundle.js',
    library: 'app/bundle',
    libraryTarget: 'amd',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  /* devServer: {
    host: 'localhost',
    port: 3000,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server
  }, */
  /* module: {
    loaders: [{
      test: /\.js&/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src'),
    }],
  },*/
};
