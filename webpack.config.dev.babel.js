import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import options from './webpack.config.base.babel';

const appPath = path.resolve(__dirname, '');

// 定义根目录上下文，因为有的项目是用二级路径区分的
const context = options.context;
const entry = options.entry;
const resolve = options.resolve;
delete entry.vendor;
const plugins = [
  new webpack.HotModuleReplacementPlugin(), // 热部署替换模块
  new webpack.NoEmitOnErrorsPlugin(),
  new ExtractTextPlugin('css/style.[name].[chunkhash].css'),
  new webpack.LoaderOptionsPlugin({
    debug: true,
    options: {
      // eslint 配置
      eslint: {
        emitError: true, // 验证失败，终止
        configFile: '.eslintrc.js'
      },
    }
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    }
  }),
  new HtmlWebpackPlugin(options.html[0])
];
const webpackConfig = {
  devtool: 'eval-source-map', // 生成 source map文件
  target: 'web', // webpack 能够为多种环境构建编译, 默认是 'web'，可省略 https://doc.webpack-china.org/configuration/target/
  resolve,

  // 入口文件 让webpack用哪个文件作为项目的入口
  entry,

  // 出口 让webpack把处理完成的文件放在哪里
  output: {
    // 编译输出目录, 不能省略
    path: path.resolve(appPath, 'public'), // 打包输出目录（必选项）
    filename: '[name].bundle.js', // 文件名称
    //资源上下文路径，可以设置为 cdn 路径，比如 publicPath: 'http://cdn.example.com/assets/[hash]/'
    publicPath: `${context}/`,
  },
  devServer: {
    inline: true,
    clientLogLevel: 'none',
    compress: true,
    contentBase: path.resolve(appPath, 'public'),
    hot: true,
    port: 5000,
    publicPath: `${context}/`,
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [
        //多页面，则可以设置二级目录来区分
        { from: /^.*$/, to: '/index.html' }
      ]
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8888'
      },
    },
  },
  // loader 目录配置
  
  module: {
    rules: [
      // https://github.com/MoOx/eslint-loader
      {
        enforce: 'pre',
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      ...options.middleRules,
    ]
  },
  plugins
};

webpackConfig.plugins.push(
  new webpack.DllReferencePlugin({
    context: __dirname,
    /**
     * 在这里引入 manifest 文件
     */
    manifest: require('./public/cached/vendor-manifest.json')
  })
);
export default webpackConfig;

