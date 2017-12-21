import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO ,
  DEL_TODO,
  COMPLETED_ALL_TODO,
  CLEAN_COMPLETED_TODO,
  COMPLETED_ALL_CHECK,
  SET_VISIBILITY_FILTER
} from './actions'


function isAllDone(state = false, action) {
  switch (action.type) {
    case COMPLETED_ALL_CHECK:
      return !state

    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          isDone: false
        }
      ]

    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            isDone: action.isDone
          })
        }
      })

    case DEL_TODO:
      return state.filter((todo, index) => {
        if (index !== action.index) {
          return todo
        }
      })

    case COMPLETED_ALL_TODO:
      return state.map((todo) => {
        return Object.assign({}, todo, {
          isDone: action.isAllDone
        })
      })

    case CLEAN_COMPLETED_TODO:
      return state.filter((todo) => {
        return todo.isDone === false
      })

    default:
      return state
  }
}

/*combineReducers 等价于下面的写法
export default function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action)
    isAllDone: isAllDone(state.todos.isAllDone, action)
  }
}*/

const todoApp = combineReducers({
  todos,
  isAllDone
})

export default todoApp
