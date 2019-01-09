import React from 'react'
import { connect } from 'react-redux'
import { getCurrentTask } from '../../../selectors/tasks'

const Task = props => (
  <div>
    <h1>Title: {props.task.title}</h1>
    <p>Status: {props.task.category}</p>
  </div>
)

const mapStateToProps = (state, props) => {
  const { taskId } = props.match.params
  return {
    task: getCurrentTask(state.tasks, taskId)
  }
}

export default connect(mapStateToProps)(Task)
