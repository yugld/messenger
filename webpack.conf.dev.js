const { merge } = require('webpack-merge');
const common = require('./webpack.conf.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'bundle.js',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: './dist',
    port: 1234,
    hot: true,
    compress: true,
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader', 
          'postcss-loader', 
          'sass-loader',
        ],
      },
    ],
  },
});
