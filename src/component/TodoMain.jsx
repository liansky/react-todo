import React, { Component } from 'react'
import TodoItem from './TodoItem'

class TodoMain extends Component {
  
  render () {
    return (
      <div className="todo-main">
        <ul className="todo-list">
          {this.props.todos.map((todo, index) => {
            return <TodoItem key={index} {...todo} index={index} {...this.props}/>
          })}
        </ul>
      </div>
    )
  }
}

export default TodoMain
