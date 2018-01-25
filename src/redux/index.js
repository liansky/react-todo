import { createStore } from 'redux'
import todoApp from './reducers'

const initStore = {
  todoDoneCount: 1,
  todos: [
    {
      text: '123',
      isDone: true
    },
    {
      text: '3243',
      isDone: false
    },
    {
      text: '456',
      isDone: false
    }
  ]
}

export default createStore(todoApp, initStore)