module.exports = {
  dev: {
    port: '8088',
    proxyTable: {
      '/proxy': {
        target: 'https://api3.9f.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': ''
        }
      }
    }
  },
  build: {
    appPath: '../src',      // 源码入口
    buildPath: '../dist',   // 产出路径
    publicPath: '/'          // 配置CDN路径
  },
}
