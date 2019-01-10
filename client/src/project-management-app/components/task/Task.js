import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Task = props => {
  const { title, category, description } = props.task
  const { projectId, taskId } = props.match.params
  return (
    <div>
      <h1>{title}</h1>
      <h3>{category}</h3>
      <p>{description}</p>
      <Link to={`/dashboard/projects/${projectId}/${taskId}/edit`}>Edit</Link>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  const { tasks } = state
  const { taskId } = props.match.params
  return {
    task: tasks.find(task => task._id === taskId)
  }
}

export default connect(mapStateToProps)(Task)
