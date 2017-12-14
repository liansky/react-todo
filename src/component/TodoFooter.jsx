import React, { Component } from 'react'

class TodoFooter extends Component {
  // 清除已完成任务
  handlerClearDone () {
    this.props.clearDoneTodo()
  }
  
  // 处理全选与全不选的状态
  handlerAllState(event){
    this.props.changeAllTodoState(event.target.checked)

  }
  
  render () {
    let btnStyle = {
      backgroundColor: this.props.todoDoneCount > 0 ? '#F15B5A' : '#ccc'
    }
    
    return (
      <div className="todo-footer">
        <div className="value">
          <input type="checkbox" checked={this.props.isAllChecked} onChange={this.handlerAllState.bind(this)}/>
          <span>{this.props.todoDoneCount}已完成 / {this.props.todoCount}总数</span>
        </div>
        <div className="action">
          <button
            type="button"
            className="btn"
            onClick={this.handlerClearDone.bind(this)}
            style={btnStyle}
            disabled={this.props.todoDoneCount <= 0}
          >清除已完成</button>
        </div>
      </div>
    )
  }
}

export default TodoFooter
