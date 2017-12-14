import React, { Component } from 'react'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoFooter from './TodoFooter'
import { connect } from 'react-redux'
import { addTodo, delTodo, toggleTodo, completedAllTodo, cleanCompletedTodo } from '../redux/actions'

class App extends Component {
  constructor (props) {
    super(props)
  }

  componentWillUpdate(nextProps) {

  }
  
  // 添加任务
  addTodo (text) {
    this.props.dispatch(addTodo(text))
  }
  
  // 删除任务
  delTodo (index) {
    this.props.dispatch(delTodo(index))
  }
  
  // 清除已完成任务
  clearDoneTodo () {
    this.props.dispatch(cleanCompletedTodo())
  }
  
  // 改变任务状态
  changeTodoState (index, isDone) {
    this.props.dispatch(toggleTodo(index, isDone))
  }

  changeAllTodoState (isAllDone) {
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
          todoDoneCount={
            (this.props.todos && this.props.todos.filter((todo)=>todo.isDone)).length || 0
          }
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
    isAllDone: state.isAllDone
  }
}

export default connect(select)(App)
