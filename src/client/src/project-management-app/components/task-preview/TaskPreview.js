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
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import CachedIcon from '@material-ui/icons/Cached'
import BugReportIcon from '@material-ui/icons/BugReport'
import { startEditTask } from '../../../actions/tasks/tasks'
import { getLabelFromCategory } from '../../../utils/category'

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
    const { correspondingProject, _id, title, category } = this.props.task
    let icon
    switch (category) {
      case 'todo':
        icon = <AssignmentIcom className={classes.icon} />
        break
      case 'in_progress':
        icon = <CachedIcon className={classes.icon} />
        break
      case 'completed':
        icon = <AssignmentTurnedInIcon className={classes.icon} />
        break
      case 'needs_rework':
        icon = <BugReportIcon className={classes.icon} />
        break
      default:
        icon = <AssignmentIcom className={classes.icon} />
    }
    return (
      <div>
        <ListItem className={classes.listItem}>
          <div className={classes.taskContent}>
            {icon}
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
                {getLabelFromCategory(opt)}
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
    margin: '0 0 1rem 0'
  },
  taskContent: {
    display: 'flex',
    alignItems: 'center'
  },
  select: {},
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
