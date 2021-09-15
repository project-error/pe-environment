const webpack = require('webpack');
const path = require('path');
const RemovePlugin = require('remove-files-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');

const server = {
  entry: './server/server.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })],
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(buildPath, 'server'),
  },
  target: 'node',
};

const client = {
  entry: './client/client.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })],
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'client.js',
    path: path.resolve(buildPath, 'client'),
  },
};

module.exports = [server, client];
