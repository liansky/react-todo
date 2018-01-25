export const ADD_TODO = 'ADD_TODO'          // 添加
export const DEL_TODO = 'DEL_TODO'          // 删除
export const TOGGLE_TODO = 'TOGGLE_TODO'    // 完成
export const COMPLETED_ALL_TODO = 'COMPLETED_ALL_TODO' // 完成所有
export const CLEAN_COMPLETED_TODO = 'CLEAN_COMPLETED_TODO'  // 清除已完成

export const INCREMENT = 'INCREMENT'  // 已完成任务数增加
export const DECREMENT = 'DECREMENT'  // 已完成任务数减少
export const REST = 'REST'            // 已完成任务数清零
export const COMPLETED = 'COMPLETED'  // 已完成任务数清零


/**
 * action 创建函数
 */

export function addTodo (text) {
  return { type: ADD_TODO, text }
}

export function delTodo (index) {
  return { type: DEL_TODO, index }
}

export function toggleTodo (index) {
  return{ type: TOGGLE_TODO, index }
}

export function completedAllTodo (isAllDone) {
  return{ type: COMPLETED_ALL_TODO, isAllDone }
}

export function cleanCompletedTodo () {
  return { type: CLEAN_COMPLETED_TODO }
}


// 已完成任务数控制
export function increment () {
  return { type: INCREMENT }
}

export function decrement () {
  return { type: DECREMENT }
}

export function rest () {
  return { type: REST }
}

export function completed (length) {
  return { type: COMPLETED, length }
}

