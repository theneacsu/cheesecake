import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startAddTask } from '../../../actions/tasks/tasks'
import ownClasses from './CreateTask.module.css'

class CreateTask extends Component {
  state = {
    category: this.props.category,
    title: '',
    error: undefined
  }

  handleInputChange = e => {
    const key = e.target.name
    const { value } = e.target
    this.setState(() => ({ [key]: value }))
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { title, category } = this.state
    const { projectId: correspondingProject } = this.props
    const validTaskData = title.trim().length > 2 && category.trim().length > 3
    if (validTaskData) {
      const taskData = {
        title,
        category,
        correspondingProject
      }
      this.props.startAddTask(taskData)
      this.setState(() => ({ title: '', error: undefined }))
    } else {
      const error = 'The task must have at least 3 characters.'
      this.setState(() => ({ error }))
    }
  }

  render() {
    const { title, error } = this.state
    return (
      <>
        <form onSubmit={this.handleFormSubmit} className={ownClasses.form}>
          <input
            className={ownClasses.input}
            type="text"
            name="title"
            value={title}
            onChange={this.handleInputChange}
            placeholder="Add a new task..."
          />
        </form>
        {error && (
          <p
            style={{ color: 'white', fontStyle: 'italic', textAlign: 'center' }}
          >
            {error}
          </p>
        )}
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startAddTask: taskData => dispatch(startAddTask(taskData))
})

export default connect(
  undefined,
  mapDispatchToProps
)(CreateTask)
