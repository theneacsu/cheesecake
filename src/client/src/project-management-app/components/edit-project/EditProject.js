import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles, TextField, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
  startEditProject,
  startDeleteProject
} from '../../../actions/projects/projects'
import ownClasses from './EditProject.module.css'

class EditProject extends Component {
  state = {
    title: this.props.project.title,
    description: this.props.project.description,
    error: undefined
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
          </div>
        </form>
        <Typography
          variant="h5"
          className={[classes.heading, classes.button, classes.deleteArea].join(
            ' '
          )}
        >
          <Link
            to="/dashboard"
            onClick={() => startDeleteProject(project._id)}
            className={[classes.link, ownClasses.link].join(' ')}
          >
            Delete Project
          </Link>
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
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(EditProject)
