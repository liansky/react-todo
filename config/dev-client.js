/* eslint-disable */
require('eventsource-polyfill')   // 热更新兼容ie

const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
// 监听刷新事件
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
