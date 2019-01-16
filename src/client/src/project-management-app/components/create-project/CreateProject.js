import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles, TextField, Button } from '@material-ui/core'
import { startAddProject } from '../../../actions/projects/projects'
import ownClasses from '../../../theme/AuthForm.module.css'

class CreateProject extends Component {
  state = {
    title: '',
    description: ''
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
    }
  }

  render() {
    const { classes } = this.props
    const { title, description } = this.state
    return (
      <form onSubmit={this.handleFormSubmit} className={classes.form}>
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
        <div className={ownClasses.buttonDiv}>
          <Button
            type="submit"
            style={{
              fontSize: '20px',
              border: '1px solid white',
              padding: '1rem',
              borderRadius: '10px'
            }}
            color="secondary"
          >
            Create Project
          </Button>
        </div>
      </form>
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
  }
})

export default compose(
  connect(
    undefined,
    mapDispatchToProps
  ),
  withStyles(styles)
)(CreateProject)
