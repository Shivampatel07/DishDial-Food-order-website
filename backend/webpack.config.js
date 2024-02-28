const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './server.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    clean: true
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
        }
      ]
    },
    externals: [nodeExternals()], // Add this line
};