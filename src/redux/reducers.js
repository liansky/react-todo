import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO ,
  DEL_TODO,
  COMPLETED_ALL_TODO,
  CLEAN_COMPLETED_TODO,
  INCREMENT,
  DECREMENT,
  REST,
  COMPLETED
} from './actions'

function todoDoneCount (state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1

    case DECREMENT:
      return state - 1

    case REST:
      return 0

    case COMPLETED:
      return action.length
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
            isDone: !todo.isDone
          })
        }
        return todo
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

const todoApp = combineReducers({
  todos,
  todoDoneCount
})

export default todoApp
