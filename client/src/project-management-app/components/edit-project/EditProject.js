import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startEditProject } from '../../../actions/projects/projects'

class EditProject extends Component {
  state = {
    title: this.props.project.title,
    description: this.props.project.description,
    error: undefined
  }

  handleInputChange = e => {
    const key = e.target.name
    const { value } = e.target
    this.setState(() => ({ [key]: value }))
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { title, description } = this.state
    const updates = { newTitle: title, newDescription: description }
    const areUpdatesValid = title.trim().length > 2
    if (areUpdatesValid) {
      this.props.startEditProject(updates, this.props.project._id)
      this.props.history.goBack()
    } else {
      const error = 'The data youn entered is invalid'
      this.setState(() => ({ error }))
    }
  }

  render() {
    const { title, description } = this.state
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h1>{title}</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          name="title"
          onChange={this.handleInputChange}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={this.handleInputChange}
          name="description"
        />
        <button>Save</button>
      </form>
    )
  }
}

const mapStateToProps = (state, props) => ({
  project: state.projects.find(
    project => project._id === props.match.params.projectId
  )
})

const mapDispatchToProps = dispatch => ({
  startEditProject: (updates, projectId) =>
    dispatch(startEditProject(updates, projectId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProject)
