import React, { Component } from 'react'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoFooter from './TodoFooter'
import Localdb from 'localdb'

class App extends Component {
  constructor () {
    super()
    // 保存本地
    this.db = new Localdb('todos', 'Array', true)
    this.dbCheck = new Localdb('dbCheck', 'Object')
    
    // 同步本地任务
    this.state = {
      todos: this.db.get() || [],
      isAllChecked: this.dbCheck.get('isAllChecked') || false
    }
  }
  
  // 添加任务
  addTodo (todoItem) {
    this.state.todos.push(todoItem)
    this.allChecked()
    this.db.add(todoItem)
  }
  
  // 删除任务
  delTodo (index) {
    this.state.todos.splice(index, 1)
    this.db.remove('index', index)
    
    this.setState({
      todos: this.state.todos
    })
    this.allChecked()
  }
  
  // 清除已完成任务
  clearDoneTodo () {
    let todos = this.state.todos.filter(todo => !todo.isDone)
    
    this.setState({ // 修改组件状态是个异步操作
      todos: todos,
      isAllChecked: false
    }, () => {
      this.allChecked()
    })
    
    this.db.find({'isDone': true}).forEach(note => {
      this.db.remove('text', note.text)
    })
  }
  
  // 改变任务状态
  changeTodoState (index, isDone, isChangeAll = false) {
    if (isChangeAll) { // 全部完成
      this.setState({
        todos: this.state.todos.map((todo) => {
          todo.isDone = isDone
          return todo
        }),
        isAllChecked: isDone
      })
      
      this.db.find({}).forEach(note => {
        note.isDone = isDone
        this.db.save(note)
      })
      this.dbCheck.set('isAllChecked', isDone)
    } else {
      this.state.todos[index].isDone = isDone
      
      this.db.find({'index': index}).forEach(note => {
        note.isDone = isDone
        this.db.save(note)
      })
      
      this.allChecked()
    }
  }
  
  // 判断是否每个任务都完成
  allChecked () {
    let isAllChecked = false
    if(this.state.todos.every((todo)=> todo.isDone)){
      isAllChecked = true
    }
    
    if (this.state.todos.length === 0) {
      isAllChecked = false
    }
    
    this.setState({todos: this.state.todos, isAllChecked})
    this.dbCheck.set('isAllChecked', isAllChecked)
  }
  
  render () {
    return (
      <div className="todo-wrap">
        <h1 className="todo-title">React-Todos</h1>
        
        <TodoHeader
          addTodo={this.addTodo.bind(this)}
        />
        
        <TodoMain
          todos={this.state.todos}
          changeTodoState={this.changeTodoState.bind(this)}
          delTodo={this.delTodo.bind(this)}
        />
        
        <TodoFooter
          todoCount={this.state.todos.length || 0}
          todoDoneCount={
            (this.state.todos && this.state.todos.filter((todo)=>todo.isDone)).length || 0
          }
          changeTodoState={this.changeTodoState.bind(this)}
          clearDoneTodo={this.clearDoneTodo.bind(this)}
          isAllChecked={this.state.isAllChecked}
        />
      </div>
    )
  }
}

export default App
