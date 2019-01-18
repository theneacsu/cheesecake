import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import {
  withStyles,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide
} from '@material-ui/core'
import {
  startEditProject,
  startDeleteProject
} from '../../../actions/projects/projects'
import ownClasses from './EditProject.module.css'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class EditProject extends Component {
  state = {
    title: this.props.project.title,
    description: this.props.project.description,
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
    const { value } = e.target
    this.setState(() => ({ [key]: value }))
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { title, description } = this.state
    const updates = { title, description }
    const isTitleValid = title.trim().length > 2
    if (isTitleValid) {
      this.props.startEditProject(updates, this.props.project._id)
      this.props.history.goBack()
    } else {
      const error = 'The title must have at least 3 charactes.'
      this.setState(() => ({ error }))
    }
  }

  render() {
    const { title, description, error } = this.state
    const { startDeleteProject, project, classes } = this.props
    return (
      <div className={ownClasses.wrapper}>
        <form onSubmit={this.handleFormSubmit} className={classes.form}>
          <Typography variant="h4" className={classes.heading}>
            {title}
          </Typography>
          {error && <p className={classes.error}>{error}</p>}
          <div>
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
            <Typography
              variant="h5"
              className={[classes.heading, classes.button].join(' ')}
            >
              <button
                className={[
                  classes.link,
                  ownClasses.link,
                  ownClasses.goBack
                ].join(' ')}
                onClick={() =>
                  this.props.history.push(
                    `/dashboard/projects/${this.props.match.params.projectId}`
                  )
                }
              >
                Go back
              </button>
            </Typography>
          </div>
        </form>
        <Typography
          variant="h5"
          className={[classes.heading, classes.button, classes.deleteArea].join(
            ' '
          )}
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
              >{`Are you sure you want to delete the project: ${title}?`}</p>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <strong>Once you delete it, there is no way back.</strong>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleClose}
                color="primary"
                className={classes.btnDialog}
              >
                Cancel
              </Button>
              <Button
                className={classes.btnDialog}
                onClick={() => {
                  this.handleClose()
                  startDeleteProject(project._id)
                  this.props.history.push('/dashboard')
                }}
                color="primary"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Typography>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  project: state.projects.find(
    project => project._id === props.match.params.projectId
  )
})

const mapDispatchToProps = dispatch => ({
  startEditProject: (updates, projectId) =>
    dispatch(startEditProject(updates, projectId)),
  startDeleteProject: id => dispatch(startDeleteProject(id))
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
    margin: '1rem auto 0',
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
  btnDelete: {
    width: '200px',
    textTransform: 'capitalize',
    fontSize: '1.5rem',
    fontWeight: 'normal',
    border: '1px solid white',
    padding: '.75rem',
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
)(EditProject)
