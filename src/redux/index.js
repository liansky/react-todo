import { createStore } from 'redux'
import todoApp from './reducers'

const initStore = {
  isAllDone: false,
  todos: [
    // {
    //   text: '123',
    //   isDone: false
    // },
    // {
    //   text: '3243',
    //   isDone: false
    // },
    // {
    //   text: '456',
    //   isDone: false
    // }
  ]
}



export default createStore(todoApp, initStore)