import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import {
  withStyles,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
  Slide
} from '@material-ui/core'
import { getCurrentTask } from '../../../selectors/tasks'
import { startEditTask, startDeleteTask } from '../../../actions/tasks/tasks'
import { getLabelFromCategory } from '../../../utils/category'
import ownClasses from './EditTask.module.css'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class Task extends Component {
  state = {
    title: this.props.task.title,
    category: this.props.task.category,
    description: this.props.task.description || '',
    options: this.props.options,
    error: undefined,
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleInputChange = e => {
    const key = e.target.name
    const value = e.target.value
    this.setState(() => ({ [key]: value }))
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { projectId, taskId } = this.props.match.params
    const updates = _.pick(this.state, ['title', 'category', 'description'])
    const isTitleValid = updates.title.trim().length > 2
    if (isTitleValid) {
      this.props.startEditTask(updates, projectId, taskId)
      this.props.history.goBack()
    } else {
      const error = 'The title must be at least 3 characters.'
      this.setState(() => ({ error }))
    }
  }

  handleDeleteButton = e => {
    const { correspondingProject, _id } = this.props.task
    const { startDeleteTask } = this.props
    const { projectId } = this.props.match.params
    startDeleteTask(correspondingProject, _id)
    this.props.history.push(`/dashboard/projects/${projectId}`)
  }

  render() {
    const { title, category, description, error } = this.state
    const { options, classes } = this.props
    const propsCategory = this.props.task.category
    const actualStatus = getLabelFromCategory(propsCategory)
    return (
      <div className={ownClasses.wrapperDiv}>
        <form onSubmit={this.handleFormSubmit} className={ownClasses.form}>
          <div>
            <Typography
              variant="h4"
              className={[classes.field, classes.heading].join(' ')}
            >
              Edit Task
            </Typography>
            <TextField
              label="Title"
              multiline
              rowsMax="4"
              value={title}
              onChange={this.handleInputChange}
              className={classes.input}
              margin="normal"
              name="title"
              variant="outlined"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }
              }}
              InputProps={{
                classes: {
                  root: [classes.cssOutlinedInput, classes.input].join(' '),
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                }
              }}
            />
          </div>
          <div>
            <TextField
              label="Description"
              multiline
              rows="4"
              rowsMax="8"
              value={description}
              onChange={this.handleInputChange}
              className={classes.input}
              margin="normal"
              variant="outlined"
              name="description"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }
              }}
              InputProps={{
                classes: {
                  root: [classes.cssOutlinedInput, classes.input].join(' '),
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                }
              }}
            />
          </div>
          <InputLabel htmlFor="status" className={classes.label}>
            Status:
          </InputLabel>
          <Select
            disableUnderline={true}
            value={category}
            name="category"
            onChange={this.handleInputChange}
            inputProps={{
              id: 'status'
            }}
            style={{ color: 'white', fontSize: '1.5rem' }}
          >
            <MenuItem key={propsCategory} value={propsCategory}>
              {actualStatus}
            </MenuItem>
            {options.map(opt => (
              <MenuItem key={opt} value={opt}>
                {getLabelFromCategory(opt)}
              </MenuItem>
            ))}
          </Select>
          <div>
            <Typography
              variant="h5"
              className={[classes.heading, classes.button].join(' ')}
            >
              <button
                type="submit"
                className={[
                  classes.link,
                  ownClasses.link,
                  ownClasses.saveBtn
                ].join(' ')}
              >
                Save
              </button>
            </Typography>
          </div>
        </form>
        {error && <p>{error}</p>}
        <Typography
          variant="h5"
          className={[classes.heading, classes.editArea].join(' ')}
        >
          <button
            className={[
              classes.link,
              ownClasses.link,
              ownClasses.normalLink
            ].join(' ')}
            onClick={() => this.props.history.goBack()}
          >
            Go back
          </button>
        </Typography>
        <Typography
          variant="h5"
          className={[classes.heading, classes.deleteBtnArea].join(' ')}
        >
          <Button
            to="#"
            onClick={this.handleClickOpen}
            className={[classes.link, classes.btnDelete, ownClasses.link].join(
              ' '
            )}
          >
            Delete
          </Button>
        </Typography>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <p
              className={classes.dialogTitle}
            >{`Are you sure you want to delete the task: ${title}?`}</p>
            <p
              className={classes.dialogTitle}
            >{`The task's status: ${getLabelFromCategory(
              this.state.category
            )}`}</p>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <strong>Once you delete it, there is no way back.</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              className={classes.btnDialog}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              className={classes.btnDialog}
              onClick={() => {
                this.handleClose()
                this.handleDeleteButton()
                this.props.history.push(
                  `/dashboard/projects/${this.props.match.params.projectId}`
                )
              }}
              color="primary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { taskId } = props.match.params
  const task = getCurrentTask(state.tasks, taskId)
  return {
    task,
    options: ['todo', 'in_progress', 'completed', 'needs_rework'].filter(
      option => option !== task.category
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startEditTask: (updates, projectId, taskId) =>
    dispatch(startEditTask(updates, projectId, taskId)),
  startDeleteTask: (projectId, taskId) =>
    dispatch(startDeleteTask(projectId, taskId))
})

const styles = theme => ({
  input: {
    color: 'white',
    width: '100%'
  },
  cssLabel: {
    color: 'white',
    fontSize: '1rem',
    '&$cssFocused': {
      color: 'white'
    }
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: 'gray'
    }
  },
  cssFocused: {},
  notchedOutline: {
    borderColor: 'white !important'
  },
  form: {
    padding: '0 2rem',
    margin: '1rem auto',
    maxWidth: '500px'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    width: '200px'
  },
  heading: {
    textAlign: 'center',
    color: 'white'
  },
  error: {
    color: 'white',
    fontStyle: 'italic'
  },
  deleteArea: {
    paddingBottom: '2rem'
  },
  field: {
    color: 'white',
    padding: '1rem 0'
  },
  deleteBtnArea: {
    margin: '1rem 0'
  },
  label: {
    color: 'white',
    marginRight: '2rem',
    fontSize: '1.5rem'
  },
  btnDelete: {
    width: '200px',
    textTransform: 'capitalize',
    fontSize: '1.5rem',
    fontWeight: 'normal',
    border: '1px solid white',
    padding: '.75rem',
    margin: '0 0 1rem',
    borderRadius: '10px',
    ' &:hover': {
      background: '#f97272'
    }
  },
  btnDialog: {
    color: 'gray',
    ' &:hover': {
      background: 'gray',
      color: 'white'
    }
  },
  dialogTitle: {
    color: '#3A5B54'
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Task)
