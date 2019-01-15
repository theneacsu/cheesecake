import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'
import { Typography, Grid, withStyles } from '@material-ui/core'
import TaskStage from '../task-stage/TaskStage'
import { getTasksByCategory } from '../../../selectors/tasks'
import getCurrentProject from '../../../selectors/projects'
import ownClasses from './Project.module.css'

const Project = props => {
  const { title, description } = props.project
  const projectId = props.project._id
  const { mappedTasksStages, classes } = props
  return (
    <div>
      <Typography variant="h3" className={classes.heading}>
        {title}
      </Typography>
      {description && (
        <Typography
          variant="h6"
          className={[classes.heading, classes.description].join(' ')}
        >
          - {description} -
        </Typography>
      )}

      <Grid container className={classes.taskStages}>
        {mappedTasksStages.map(taskStage => (
          <TaskStage
            key={taskStage.category}
            {...taskStage}
            projectId={projectId}
          />
        ))}
      </Grid>

      <Typography
        variant="h5"
        className={[classes.heading, classes.button].join(' ')}
      >
        <Link
          to={`/dashboard/projects/${projectId}/edit`}
          className={[classes.link, ownClasses.link, ownClasses.button].join(
            ' '
          )}
        >
          Edit Project
        </Link>
      </Typography>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  const { projects, tasks } = state
  const { projectId } = props.match.params
  return {
    project: getCurrentProject(projects, projectId),
    mappedTasksStages: [
      {
        stage: 'Todo',
        category: 'todo',
        tasks: getTasksByCategory(tasks, 'todo', projectId),
        options: ['in_progress', 'completed', 'needs_rework']
      },
      {
        stage: 'In Progress',
        category: 'in_progress',
        tasks: getTasksByCategory(tasks, 'in_progress', projectId),
        options: ['todo', 'completed', 'needs_rework']
      },
      {
        stage: 'Completed',
        category: 'completed',
        tasks: getTasksByCategory(tasks, 'completed', projectId),
        options: ['todo', 'in_progress', 'needs_rework']
      },
      {
        stage: 'Needs Rework',
        category: 'needs_rework',
        tasks: getTasksByCategory(tasks, 'needs_rework', projectId),
        options: ['todo', 'in_progress', 'completed']
      }
    ]
  }
}

const styles = theme => ({
  heading: {
    color: 'white',
    textAlign: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  button: {
    margin: '4rem 0 2rem'
  },
  description: {
    marginTop: '1.5rem',
    fontWeight: 'normal',
    [theme.breakpoints.up('lg')]: {
      marginBottom: '2rem'
    }
  },
  taskStages: {
    maxWidth: '2400px',
    margin: 'auto'
  }
})

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Project)
