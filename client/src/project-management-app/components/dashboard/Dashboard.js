import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  state = {
    projects: this.props.projects,
    email: this.props.auth.email
  }

  render() {
    return (
      <div>
        <h1>Logged in as: {this.props.auth.email}</h1>
        {this.state.projects.length > 0 ? (
          this.state.projects.map(project => (
            <p key={project.id}>{project.title}</p>
          ))
        ) : (
          <>
            <p>Get started by adding a project</p>
            <button>Create a project</button>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  auth: state.auth
})

export default connect(mapStateToProps)(Dashboard)
