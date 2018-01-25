import { createStore } from 'redux'
import todoApp from './reducers'

const initStore = {
  todoDoneCount: 1,
  todos: [
    {
      text: '吃饭',
      isDone: true
    },
    {
      text: '上网',
      isDone: false
    },
    {
      text: '打豆豆',
      isDone: false
    }
  ]
}

export default createStore(todoApp, initStore)