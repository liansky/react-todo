import './assets/style/reset.css'

import React, { Component } from 'react'
import { render } from 'react-dom'

class HelloMessage extends Component {
  render () {
    return (
      <div className="blue">
        <span>Hello {this.props.name}</span>
      </div>
    )
  }
}

// 加载组件到 DOM 元素 mountNode
render(<HelloMessage name="小明" />, document.getElementById('app'))