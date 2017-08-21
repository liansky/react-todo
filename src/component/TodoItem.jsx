import React, { Component } from 'react'

class TodoItem extends Component {
  
  // 处理完成单个任务、是否完成
  handlerChange (evt) {
    let isDone = this.props.isDone
    this.props.changeTodoState(this.props.index, !isDone)
    evt.preventDefault()
    evt.stopPropagation()
  }
  
  // 删除任务
  handlerDel (evt) {
    this.props.delTodo(this.props.index)
    evt.preventDefault()
    evt.stopPropagation()
  }
  
  // 鼠标移入
  handlerMouseOver () {
    this.refs.deleteBtn.style.display = "inline"
  }
  
  // 鼠标移出
  handlerMouseOut () {
    this.refs.deleteBtn.style.display = "none"
  }
  
  render () {
    let doneStyle = this.props.isDone ? {textDecoration: 'line-through'} : {textDecoration: 'none'}
    
    return (
      <li
        onMouseOver={this.handlerMouseOver.bind(this)}
        onMouseOut={this.handlerMouseOut.bind(this)}
        onClick={this.handlerChange.bind(this)}
      >
          <input type="checkbox" checked={this.props.isDone} onChange={this.handlerChange.bind(this)}/>
          <div className="label" style={doneStyle}>{this.props.text}</div>
          <div className="action">
            <button type="button" className="btn" ref="deleteBtn" onClick={this.handlerDel.bind(this)}>删除</button>
          </div>
      </li>
    )
  }
}

export default TodoItem
