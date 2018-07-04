const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const distPath = path.join(__dirname, './docs');
const docsPath = path.join(__dirname, './demo');
const srcPath = path.join(__dirname, './src');

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader']
    })
  }
];

const entry = {
	docs: path.join(docsPath, 'index.js')
}

const plugins = [
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin(),
	new HtmlWebpackPlugin({
		template: path.join(docsPath, 'index.html'),
		path: distPath,
		filename: 'index.html',
	}),
	new ExtractTextPlugin({filename: 'style.css'})
]

module.exports = {
  entry,
  output: {
    path: distPath,
    filename: '[name].js',
  },
  module: {
    rules
	},
	plugins
};
