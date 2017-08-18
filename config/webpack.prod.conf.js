const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');       // css单独打包
const HtmlWebpackPlugin = require('html-webpack-plugin');               // 生成html
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')  // 友好的错误提示
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')  // css压缩
const conf = require('./conf')
const rm = require('rimraf')        // 清除目录插件

//定义地址
const APP_PATH = path.resolve(__dirname, conf.build.appPath);       // __dirname 中的src目录，以此类推
const BUILD_PATH = path.resolve(__dirname, conf.build.buildPath);       // 发布文件所存放的目录

// 清除产出目录
rm(BUILD_PATH, err => {
  if (err) throw err
})

const webpackConfig = {
  entry: {
    app: [
      path.resolve(APP_PATH, 'app')             // app入口
    ]
  },
  output: {
    path: BUILD_PATH,
    filename: path.posix.join('static', 'js/[name].[chunkhash].js'),
    chunkFilename: path.posix.join('static', 'js/[id].[chunkhash].js'),
    // 配置静态资源cdn路径, 默认为开发配置
    publicPath: conf.build.publicPath
  },
  resolve: {
    extensions: ['.js', '.jsx','.json', 'scss', 'sass']
  },
  devtool: '#source-map',
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
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    
    //根据模板插入css/js等生成最终HTML
    new HtmlWebpackPlugin({
      filename: path.resolve(BUILD_PATH, './index.html'),     //生成的html存放路径，相对于 path
      template: './index.html',                               //html模板路径
      inject: true, // 注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
      minify: { // 压缩配置
        removeComments: true, // 删除html中的注释代码
        collapseWhitespace: true, // 删除html中的空白符
        removeAttributeQuotes: true // 删除html元素中属性的引号
        // 更多配置
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunksSortMode: 'dependency' // 按dependency的顺序引入
    }),
  
    // 代码压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
  
    // 将js中引入的css分离的插件
    new ExtractTextPlugin({
      filename: path.posix.join('static','css/[name].[contenthash].css')
    }),
  
    // 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
  
    // 隐似输出公共包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // npm资源和src/lib、/src/plugins下的文件打包为公共文件
        return (
          module.resource &&
          /\.js$|\.jsx$/.test(module.resource) &&
          (
            (module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0) ||
            (module.resource.indexOf(path.join(__dirname, '../src/lib')) === 0) ||
            (module.resource.indexOf(path.join(__dirname, '../src/plugins')) === 0)
          )
        )
      }
    }),
  
    // 保持公共包输出哈希值不变
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
  
  
    // 报错但不退出webpack进程
    new webpack.NoEmitOnErrorsPlugin(),
    
    // 友好的错误提示
    new FriendlyErrorsPlugin()
  ]
}

// webpack静态资源分析
if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
