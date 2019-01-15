import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles, Typography } from '@material-ui/core'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import ProjectOverview from '../project-overview/ProjectOverview'
import ownClasses from './Dashboard.module.css'

class Dashboard extends Component {
  state = {
    projects: this.props.projects,
    email: this.props.auth.email
  }

  render() {
    const { classes, projects } = this.props
    const { email } = this.state
    return (
      <div className={ownClasses.wrapperDiv}>
        <Typography variant="h6" className={classes.email}>
          Logged in as: {email}
        </Typography>
        {projects.length > 0 ? (
          projects.map(project => (
            <ProjectOverview key={project._id} {...project} />
          ))
        ) : (
          <Typography className={classes.getStarted}>
            Get started by adding a project
          </Typography>
        )}
        <Typography variant="h4" className={classes.newProject}>
          <Link to={`/dashboard/projects/new`} className={ownClasses.link}>
            Create project
          </Link>
        </Typography>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  auth: state.auth
})

const styles = theme => ({
  subtitle: {
    color: 'white',
    textAlign: 'center'
  },
  newProject: {
    color: 'white',
    textAlign: 'center',
    marginTop: '4rem',
    fontSize: '1.3rem'
  },
  getStarted: {
    color: 'white',
    textAlign: 'center',
    margin: '5rem 0',
    fontSize: '1.5rem'
  },
  email: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'normal',
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  }
})

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Dashboard)
