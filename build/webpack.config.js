// Run `dotenv` module
require('dotenv-autoload');

var webpack = require('webpack');
var stringify = require('stringify-object-values');

module.exports = {
  // Basic input-output configuration
  entry: './src/index.js',
  output: {
    path: './public/dist/',
    filename: 'script.js'
  },

  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.js$/,
      loader: 'babel',
    }]
  },

  resolve: {
    // Easily import app-level files
    // Before: import x from '../../components/x';
    //  After: import x from 'app/components/x';
    alias: {
      app: [process.cwd(), 'src'].join('/')
    }
  },

  plugins: [
    // Allow our application to read environment config
    new webpack.DefinePlugin({ 'process.env': stringify(process.env) })
  ],

  devtool: 'cheap-source-map',

  // https://github.com/chentsulin/webpack-target-electron-renderer/blob/master/README.md#migrate-to-webpack-2-or-webpack-1--11215
  target: 'electron-renderer'
};
