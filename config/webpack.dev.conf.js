const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');               // 生成html
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')  // 友好的错误提示
const conf = require('./conf');

//定义地址
const APP_PATH = path.resolve(__dirname, conf.build.appPath);       // __dirname 中的src目录，以此类推
const BUILD_PATH = path.resolve(__dirname, conf.build.buildPath);       // 发布文件所存放的目录

module.exports = {
  entry: {
    app: [
      // path.resolve(__dirname, 'dev-client'),    // 热更新入口
      'webpack-hot-middleware/client?noInfo=true',
      path.resolve(APP_PATH, 'main')             // app入口
    ]
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js',
    // 配置静态资源cdn路径, 默认为开发配置
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx','.json', 'scss', 'sass']
  },
  devtool: 'cheap-module-eval-source-map', // 原始源码（仅限行）
  module: {
    rules: [
      { // es6
        test: /\.js$/,
        exclude: /^node_modules$/,
        include: [APP_PATH],
        use: ['react-hot-loader','babel-loader']
      },
  
      {
        test: /\.jsx$/,
        exclude: /^node_modules$/,
        loaders: ['react-hot-loader', 'jsx-loader', 'babel-loader'],
        include: [APP_PATH]
      },
      
      { // css处理
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
        exclude: /^node_modules$/,
        include: [APP_PATH]
      },
      
      { // 图片转base64处理
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // 限制大小小于10k的 转换为base64的字符串内嵌在生成的文件里,
              name: path.posix.join('static','img/[name].[hash:7].[ext]')
            }
          }
        ]
      },
  
      { // 字体处理
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: path.posix.join('static','fonts/[name].[hash:7].[ext]')
            }
          }
        ]
      }
    ]
  },
  
  plugins: [
    // 定义编译环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    
    //根据模板插入css/js等生成最终HTML
    new HtmlWebpackPlugin({ 
      filename: path.resolve(BUILD_PATH, './index.html'),     //生成的html存放路径，相对于 path
      template: './index.html',                               //html模板路径
      hash: false,
    }),
    
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
  
    // 报错但不退出webpack进程
    new webpack.NoEmitOnErrorsPlugin(),
    
    // 友好的错误提示
    new FriendlyErrorsPlugin()
  ]
}
