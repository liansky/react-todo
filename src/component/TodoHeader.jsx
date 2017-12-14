import React, { Component } from 'react'

class TodoHeader extends Component {
  // 绑定键盘事件
  handleKeyUp (evt) {
    if (evt.keyCode === 13) {
      let val = evt.target.value
      if (!val) return false
      evt.target.value = ''
      this.props.addTodo(val)
    }
  }
  
  render () {
    return (
      <div className="todo-header ">
        <input
          type="text"
          onKeyUp={this.handleKeyUp.bind(this)}
          placeholder="what's your task ?"/>
      </div>
    )
  }
}

export default TodoHeader
