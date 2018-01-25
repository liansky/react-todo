import React, { Component } from 'react'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoFooter from './TodoFooter'
import { connect } from 'react-redux'
import {
  addTodo,
  delTodo,
  toggleTodo,
  completedAllTodo,
  cleanCompletedTodo,
  increment,
  decrement,
  rest,
  completed
} from '../redux/actions'

class App extends Component {
  constructor (props) {
    super(props)
  }
  
  // 添加任务
  addTodo (text) {
    this.props.dispatch(addTodo(text))
  }
  
  // 删除任务
  delTodo (index) {
    this.props.dispatch(delTodo(index))
    if (this.props.todos[index].isDone) {
      this.props.dispatch(decrement())
    }
  }
  
  // 清除已完成任务
  clearDoneTodo () {
    this.props.dispatch(cleanCompletedTodo())
    this.props.dispatch(rest())
  }
  
  // 改变任务状态
  changeTodoState (index, isDone) {
    if (isDone) {
      this.props.dispatch(increment())
    } else {
      this.props.dispatch(decrement())
    }
    this.props.dispatch(toggleTodo(index))
  }

  changeAllTodoState (isAllDone) {
    if (isAllDone) {
      this.props.dispatch(completed(this.props.todos.length))
    } else {
      this.props.dispatch(rest())
    }
    this.props.dispatch(completedAllTodo(isAllDone))
  }
  
  render () {
    return (
      <div className="todo-wrap">
        <h1 className="todo-title">React-Todos</h1>
        
        <TodoHeader
          addTodo={this.addTodo.bind(this)}
        />
        
        <TodoMain
          todos={this.props.todos}
          changeTodoState={this.changeTodoState.bind(this)}
          delTodo={this.delTodo.bind(this)}
        />
        
        <TodoFooter
          todoCount={this.props.todos.length || 0}
          todoDoneCount={ this.props.todoDoneCount }
          changeAllTodoState={this.changeAllTodoState.bind(this)}
          clearDoneTodo={this.clearDoneTodo.bind(this)}
          isAllChecked={this.props.isAllDone}
        />
      </div>
    )
  }
}


function select(state) {
  return {
    todos: state.todos,
    todoDoneCount: state.todoDoneCount
  }
}

export default connect(select)(App)
