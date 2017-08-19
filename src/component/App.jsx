import React, { Component } from 'react'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoFooter from './TodoFooter'

class App extends Component {
  constructor () {
    super()
  }
  
  render () {
    return (
      <div className="todo-wrap">
        <h1 className="todo-title">React-Todos</h1>
        <TodoHeader/>
        <TodoMain/>
        <TodoFooter/>
      </div>
    )
  }
}
export default App