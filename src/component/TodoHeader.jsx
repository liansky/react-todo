import React, { Component } from 'react'

class TodoHeader extends Component {
  // 绑定键盘事件
  handleKeyUp (evt) {
    if (evt.keyCode === 13) {
      let val = evt.target.value
      let newItem
      
      if (!val) return false
      
      newItem = {
        text: val,
        isDone: false
      }
      evt.target.value = ''
      this.props.addTodo(newItem)
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
