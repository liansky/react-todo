import React, { Component } from 'react'

class TodoMain extends Component {
  
  render () {
    return (
      <div className="todo-main">
        <ul className="todo-list">
          <li>
            <input type="checkbox"/>
            <div className="label">吃饭</div>
            <div className="action">
              <button type="button" className="btn">删除</button>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default TodoMain
