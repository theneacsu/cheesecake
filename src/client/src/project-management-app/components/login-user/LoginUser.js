import React, { Component } from 'react'
import validator from 'validator'
import _ from 'lodash'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { startLogin } from '../../../actions/auth/auth'
import { TextField, Button, Typography } from '@material-ui/core'
import ownClasses from '../../../theme/AuthForm.module.css'

class LoginUser extends Component {
  state = {
    email: '',
    password: '',
    error: undefined
  }

  handleInputChange = e => {
    const key = e.target.name
    const value = e.target.value
    this.setState(() => ({ [key]: value }))
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const isPasswordValid = this.state.password.length > 5
    const isEmailValid = validator.isEmail(this.state.email)
    if (isPasswordValid && isEmailValid) {
      const userData = _.pick(this.state, ['email', 'password'])
      this.props.startLogin(userData)
      this.setState(() => ({
        email: '',
        password: '',
        error: undefined
      }))
    } else {
      const error = 'The data your provided is invalid'
      this.setState(() => ({ error }))
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!this.state.error && this.props.loginFailed) {
      this.setState(() => ({ error: this.props.loginFailed }))
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={ownClasses.wrapperDiv}>
        <Typography color="secondary" variant="h4" className={ownClasses.title}>
          Login
        </Typography>
        <form onSubmit={this.handleFormSubmit}>
          <div className={ownClasses.inputField}>
            <TextField
              label="Email"
              type="email"
              name="email"
              className={ownClasses.input}
              value={this.state.email}
              onChange={this.handleInputChange}
              placeholder="ex: james@bond.com"
              InputLabelProps={{
                style: {
                  color: 'white'
                }
              }}
              InputProps={{
                classes: {
                  root: classes.input,
                  underline: classes.underline
                }
              }}
            />
          </div>
          <div className={ownClasses.inputField}>
            <TextField
              type="password"
              name="password"
              label="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder="type your password"
              color="secondary"
              InputLabelProps={{
                style: {
                  color: 'white'
                }
              }}
              InputProps={{
                classes: {
                  root: classes.input,
                  underline: classes.underline
                }
              }}
              className={ownClasses.input}
            />
          </div>
          <div className={ownClasses.buttonDiv}>
            <Button
              type="submit"
              style={{ fontSize: '20px' }}
              color="secondary"
            >
              login
            </Button>
          </div>
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startLogin: userData => dispatch(startLogin(userData))
})

const mapStateToProps = state => ({
  loginFailed: state.auth.loginFailed
})

const styles = theme => ({
  input: {
    color: 'white',
    padding: '10px 0',
    outline: 'none'
  },
  underline: {
    '&:after': {
      borderBottom: '0px solid white'
    },
    '&:before': {
      borderBottom: '0px solid white'
    },
    '&:hover::before': {
      display: 'none'
    },
    '&:hover::after': {
      display: 'none'
    },
    borderBottom: '2px solid white',
    '&:hover': {
      borderBottom: '2px solid #c9d1c4'
    }
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(LoginUser)
