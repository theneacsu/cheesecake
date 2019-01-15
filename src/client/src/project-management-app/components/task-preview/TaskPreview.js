import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import {
  ListItem,
  Typography,
  Select,
  MenuItem,
  withStyles
} from '@material-ui/core'
import AssignmentIcom from '@material-ui/icons/Assignment'
import { startEditTask } from '../../../actions/tasks/tasks'

class TaskPreview extends Component {
  handleOptionChange = e => {
    const { startEditTask } = this.props
    const { correspondingProject, _id, title, description } = this.props.task
    const category = e.target.value
    startEditTask(
      { category, description: description || '', title },
      correspondingProject,
      _id
    )
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { options, classes } = this.props
    const { correspondingProject, _id, title } = this.props.task
    return (
      <div>
        <ListItem className={classes.listItem}>
          <div className={classes.taskContent}>
            <AssignmentIcom className={classes.icon} />
            <Link
              to={`/dashboard/projects/${correspondingProject}/${_id}`}
              className={classes.link}
            >
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
            </Link>
          </div>
          <Select
            onChange={this.handleOptionChange}
            disableUnderline
            value="status"
            className={classes.select}
          >
            {options.map(opt => (
              <MenuItem value={opt} key={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </ListItem>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  task: state.tasks.find(task => task._id === props._id)
})

const mapDispatchToState = dispatch => ({
  startEditTask: (updates, projectId, taskId) =>
    dispatch(startEditTask(updates, projectId, taskId))
})

const styles = theme => ({
  icon: {
    marginRight: '1rem',
    color: 'white'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 0 1rem 0',
    padding: 0
  },
  taskContent: {
    display: 'flex',
    alignItems: 'center'
  },
  select: {
    marginRight: '2rem'
  },
  link: {
    textDecoration: 'none'
  },
  title: {
    color: 'white',
    fontWeight: 'normal'
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToState
  ),
  withStyles(styles)
)(TaskPreview)
