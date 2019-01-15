import React from 'react'
import TaskPreview from '../task-preview/TaskPreview'
import CreateTask from '../create-task/CreateTask'
import { Typography, Grid, List, withStyles } from '@material-ui/core'

const TaskStage = ({ stage, tasks, category, projectId, options, classes }) => (
  <Grid item xs={12} lg={6} xl={3} className={classes.box}>
    <Typography variant="h6" className={classes.status}>
      {stage}
    </Typography>

    {tasks.length > 0 ? (
      <List>
        {tasks.map(task => (
          <TaskPreview key={task._id} _id={task._id} options={options}>
            {task.title}
          </TaskPreview>
        ))}
      </List>
    ) : (
      <Typography variant="h6" className={classes.noTasks}>
        No tasks in this stage
      </Typography>
    )}
    <CreateTask category={category} projectId={projectId} />
  </Grid>
)

const styles = theme => ({
  status: {
    color: 'white',
    borderBottom: '1px solid white',
    textAlign: 'center',
    width: '10rem',
    margin: '0rem auto 1rem'
  },
  box: {
    [theme.breakpoints.up('sm')]: {
      padding: '1rem',
      borderBottom: '1px solid white',
      marginTop: '2rem'
    },
    [theme.breakpoints.up('lg')]: {
      borderBottom: 'none',
      borderRight: '1px solid white'
    }
  },
  noTasks: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: '1rem',
    margin: '2rem 0'
  }
})

export default withStyles(styles)(TaskStage)
