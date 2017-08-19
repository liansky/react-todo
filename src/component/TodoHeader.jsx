import React, { Component } from 'react'

class TodoHeader extends Component {
  
  render () {
    return (
      <div className="todo-header ">
        <input type="text" placeholder="what's your task ?"/>
      </div>
    )
  }
}

export default TodoHeader
