import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import { Typography, withStyles } from '@material-ui/core'
import { getLabelFromCategory } from '../../../utils/category'
import ownClasses from './Task.module.css'

const Task = props => {
  const { title, category, description } = props.task
  const { projectId, taskId } = props.match.params
  const { classes } = props
  const status = getLabelFromCategory(category)
  return (
    <div>
      <Typography
        variant="h4"
        className={[classes.field, classes.heading, ownClasses.heading].join(
          ' '
        )}
      >
        Task Overview
      </Typography>
      <div className={ownClasses.wrapperDiv}>
        <Typography variant="h5" className={[classes.field].join(' ')}>
          Title: {title}
        </Typography>
        <Typography variant="h5" className={[classes.field].join(' ')}>
          Status: {status}
        </Typography>
        {description && (
          <Typography variant="h5" className={[classes.field].join(' ')}>
            Description: {description}
          </Typography>
        )}
        <Typography variant="h6">
          <Link
            to={`/dashboard/projects/${projectId}/${taskId}/edit`}
            className={ownClasses.link}
          >
            Edit
          </Link>
        </Typography>
        <Typography variant="h6">
          <Link
            to={`/dashboard/projects/${projectId}`}
            className={ownClasses.link}
          >
            Go Back
          </Link>
        </Typography>
      </div>
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

const styles = theme => ({
  field: {
    color: 'white',
    padding: '1rem 0'
  },
  heading: {
    textAlign: 'center',
    borderBottom: '1px solid white',
    margin: '0 auto 1rem'
  }
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Task)
