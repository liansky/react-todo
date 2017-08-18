const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.dev.conf');
const opn = require('opn')
const app = express();
const compiler = webpack(config);
const conf = require('./conf');
const proxyMiddleware = require('http-proxy-middleware')

// 端口
const port = process.env.PORT || conf.dev.port
let uri = 'http://localhost:' + port
const proxyTable = conf.dev.proxyTable

// dev-server
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  quiet: true
});
app.use(devMiddleware);

// 热更新
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
});

// html模板更改，webpack编译完成，触发reload事件
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
});

// 配置代理
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

app.use(hotMiddleware);
app.use('/static', express.static('./static'));

// 构建完成自动打开浏览器
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  opn(uri)
})

app.listen(port);
