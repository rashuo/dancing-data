import path from 'path';
import webpack from 'webpack';
import options from './webpack.config.base.babel.js';

const plugins = []

const isDev = () => {
  return process.env.NODE_ENV === 'development';
}

const dirpath = isDev() ? 'cached' : 'dll';

plugins.push(new webpack.DllPlugin({
  /**
   * path
   * 定义 manifest 文件生成的位置
   * [name]的部分由entry的名字替换
   */
  path: path.join(__dirname, 'public', `${dirpath}`, '[name]-manifest.json'),
  /**
   * name
   * dll bundle 输出到那个全局变量上
   * 和 output.library 一样即可。
   */
  name: '[name]Library'
}))
if (!isDev()) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        warnings: false,
      },
      mangle: {
        except: [] // 设置不混淆变量名
      }
    }))
}
export default {
  entry: {
    vendor: options.entry.vendor
  },
  output: {
    path: path.join(__dirname, 'public', `${dirpath}`),
    filename: '[name].dll.js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendorLibrary`
     */
    libraryTarget: 'window',
    library: '[name]Library'
  },
  plugins
};
