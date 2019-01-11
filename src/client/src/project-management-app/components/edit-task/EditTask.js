import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { getCurrentTask } from '../../../selectors/tasks'
import { startEditTask, startDeleteTask } from '../../../actions/tasks/tasks'

class Task extends Component {
  state = {
    title: this.props.task.title,
    category: this.props.task.category,
    description: this.props.task.description || '',
    options: this.props.options,
    error: undefined
  }

  handleInputChange = e => {
    const key = e.target.name
    const value = e.target.value
    this.setState(() => ({ [key]: value }))
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { projectId, taskId } = this.props.match.params
    const updates = _.pick(this.state, ['title', 'category', 'description'])
    const isTitleValid = updates.title.trim().length > 2
    if (isTitleValid) {
      this.props.startEditTask(updates, projectId, taskId)
      this.props.history.goBack()
    } else {
      const error = 'The title must be at least 3 characters.'
      this.setState(() => ({ error }))
    }
  }

  handleDeleteButton = e => {
    const { correspondingProject, _id } = this.props.task
    const { startDeleteTask } = this.props
    const { projectId } = this.props.match.params
    startDeleteTask(correspondingProject, _id)
    this.props.history.push(`/dashboard/projects/${projectId}`)
  }

  render() {
    const { title, category, description, error } = this.state
    const { options } = this.props
    return (
      <>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            value={title}
            placeholder="Title"
            name="title"
            onChange={this.handleInputChange}
          />
          <textarea
            value={description}
            placeholder="Description"
            name="description"
            onChange={this.handleInputChange}
          />
          <select
            defaultValue={category}
            name="category"
            onChange={this.handleInputChange}
          >
            <option value="category">{category}</option>
            {options.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <button type="submit">Save</button>
        </form>
        {error && <p>{error}</p>}
        <button onClick={this.handleDeleteButton}>delete task</button>
      </>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { taskId } = props.match.params
  const task = getCurrentTask(state.tasks, taskId)
  return {
    task,
    options: ['todo', 'in_progress', 'completed', 'needs_rework'].filter(
      option => option !== task.category
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startEditTask: (updates, projectId, taskId) =>
    dispatch(startEditTask(updates, projectId, taskId)),
  startDeleteTask: (projectId, taskId) =>
    dispatch(startDeleteTask(projectId, taskId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task)
