const moduleName = 'dc';
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function getBabelConfig() {
  return {
    presets: [
      'react',
      ['babel-preset-env', {
        targets: {
          browsers: ['last 2 versions'],
        },
      }],
    ],
    plugins: [
      'transform-object-rest-spread',
      'transform-class-properties',
      'syntax-dynamic-import',
      'transform-function-bind',
      'babel-plugin-transform-decorators-legacy',
    ],
  };
}
module.exports = {
  title: 'dc',
  context: '',
  moduleName,
  entry: {
    vendor: [
      'classnames', 'prop-types', 'react',
      'react-dom', 'react-redux', 'react-router-dom', 'redux',
      'redux-saga',
    ],
    [`${moduleName}`]: ['babel-polyfill', './src/index.js']
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less', '.png', '.jpg', '.gif'],
    //模块别名定义，方便直接引用别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    modules: [
      'node_modules',
    ],
  },
  middleRules: [
    {
      test: /\.js(x?)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: getBabelConfig(),
    },
    // https://github.com/webpack/url-loader
    {
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[hash].[ext]',
          limit: 100000, // 100kb
        }
      }
    },
    {
      test: /\.(mp4|ogg|eot|woff|ttf|svg|woff2)$/,
      use: 'file-loader',
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'postcss-loader', 
          {
            loader: 'less-loader',
          }, {
            loader: 'less-file-alias',
            options: {
              alias: {
                '@': path.resolve(__dirname, './src'),
              }
            }
          }
        ]
      })
    }
  ],
  html: [{
    title: '',
    filename: './index.html',
    template: './index_dev.ejs',
    chunks: ['vendor', `${moduleName}`],
    isDev: true,
    // favicon: 'favicon.ico',
  },
  {
    title: '',
    filename: '../index.html',
    template: './index.ejs',
    chunks: ['vendor', `${moduleName}`],
    // favicon: 'favicon.ico',
  }],
  pathInMappingJson: '/dist/'
};
