import React, { Component } from 'react'

class TodoFooter extends Component {
  
  render () {
    return (
      <div className="todo-footer">
        <div className="value">
          <input type="checkbox"/>
          <span>3已完成 / 6总数</span>
        </div>
        <div className="action"><button type="button" className="btn">清除已完成</button></div>
      </div>
    )
  }
}

export default TodoFooter
