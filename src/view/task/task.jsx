import React from "react";
import {Button} from 'antd'
import './task.less'

class Task extends React.Component {
  render() {
    return (
        <div className="wrapper">
          <div className="header">
            <h2>TASK OA 任务管理系统</h2>
            <Button type="primary">新增</Button>
          </div>
        </div>
    )
  }
}

export default Task
