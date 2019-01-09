import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startAddProject } from '../../../actions/projects/projects'

class CreateProject extends Component {
  state = {
    title: '',
    description: ''
  }

  handleInputChange = e => {
    const key = e.target.name
    const value = e.target.value
    this.setState(() => ({ [key]: value }))
  }

  handleFormSubmit = async e => {
    e.preventDefault()
    const { title, description } = this.state
    if (title.trim().length > 5 && description.trim().length > 5) {
      await this.props.startAddProject({ title, description })
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleInputChange}
        />
        <textarea
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleInputChange}
        />
        <button>Create Project</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startAddProject: projectDetails => dispatch(startAddProject(projectDetails))
})

export default connect(
  undefined,
  mapDispatchToProps
)(CreateProject)
