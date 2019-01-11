import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startEditTask } from '../../../actions/tasks/tasks'

const TaskPreview = props => {
  const { options, startEditTask } = props

  const { correspondingProject, _id, title, description } = props.task

  const handleOptionChange = e => {
    const category = e.target.value
    startEditTask({ category, description, title }, correspondingProject, _id)
  }

  return (
    <div>
      <Link to={`/dashboard/projects/${correspondingProject}/${_id}`}>
        <p>{title}</p>
      </Link>
      <select defaultValue="none" onChange={handleOptionChange}>
        <option disabled value="none">
          {' '}
          move to
        </option>
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  task: state.tasks.find(task => task._id === props._id)
})

const mapDispatchToState = dispatch => ({
  startEditTask: (updates, projectId, taskId) =>
    dispatch(startEditTask(updates, projectId, taskId))
})

export default connect(
  mapStateToProps,
  mapDispatchToState
)(TaskPreview)
