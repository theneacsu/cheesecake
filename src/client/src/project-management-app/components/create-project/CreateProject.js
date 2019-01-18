import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles, TextField, Typography } from '@material-ui/core'
import { startAddProject } from '../../../actions/projects/projects'
import ownClasses from './CreateProject.module.css'

class CreateProject extends Component {
  state = {
    title: '',
    description: '',
    error: undefined
  }

  handleInputChange = e => {
    const key = e.target.name
    const value = e.target.value
    this.setState(() => ({ [key]: value }))
  }

  handleFormSubmit = async e => {
    e.preventDefault()
    const { title, description } = this.state
    if (title.trim().length > 2) {
      await this.props.startAddProject({ title, description })
      this.props.history.push('/dashboard')
    } else {
      const error = 'The title must have at least 3 characters'
      this.setState(() => ({ error }))
    }
  }

  render() {
    const { classes } = this.props
    const { title, description, error } = this.state
    return (
      <div>
        <form onSubmit={this.handleFormSubmit} className={classes.form}>
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
                  ownClasses.createBtn
                ].join(' ')}
              >
                Create Project
              </button>
            </Typography>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startAddProject: projectDetails => dispatch(startAddProject(projectDetails))
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
    textAlign: 'center'
  },
  error: {
    color: 'white',
    fontStyle: 'italic'
  }
})

export default compose(
  connect(
    undefined,
    mapDispatchToProps
  ),
  withStyles(styles)
)(CreateProject)
