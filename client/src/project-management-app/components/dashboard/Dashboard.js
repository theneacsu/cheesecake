import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProjectOverview from '../project-overview/ProjectOverview'

class Dashboard extends Component {
  state = {
    projects: this.props.projects,
    email: this.props.auth.email
  }

  render() {
    return (
      <div>
        <h1>Logged in as: {this.props.auth.email}</h1>
        <Link to={`/dashboard/projects/new`}>Create a project</Link>
        {this.props.projects.length > 0 ? (
          <>
            <h2>Projects:</h2>
            {this.props.projects.map(project => (
              <ProjectOverview key={project._id} {...project} />
            ))}
          </>
        ) : (
          <p>Get started by adding a project</p>
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
