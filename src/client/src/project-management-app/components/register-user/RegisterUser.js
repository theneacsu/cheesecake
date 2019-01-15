import React, { Component } from 'react'
import validator from 'validator'
import _ from 'lodash'
import { Typography, TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core'
import { startRegister } from '../../../actions/auth/auth'
import ownClasses from '../../../theme/AuthForm.module.css'

class RegisterUser extends Component {
  state = {
    email: '',
    password: '',
    confirmedPassword: '',
    error: undefined
  }

  handleInputChange = e => {
    const key = e.target.name
    const value = e.target.value
    this.setState(() => ({ [key]: value }))
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const isPasswordMatch =
      this.state.password === this.state.confirmedPassword &&
      this.state.password.length > 5
    const isEmailValid = validator.isEmail(this.state.email)
    if (isPasswordMatch && isEmailValid) {
      const userData = _.pick(this.state, [
        'email',
        'password',
        'confirmedPassword'
      ])
      this.props.startRegister(userData)
      this.setState(() => ({
        email: '',
        password: '',
        confirmedPassword: '',
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
          Create your account
        </Typography>
        <form onSubmit={this.handleFormSubmit}>
          <div className={ownClasses.inputField}>
            <TextField
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              placeholder="ex: james@bond.com"
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
          <div className={ownClasses.inputField}>
            <TextField
              type="password"
              name="password"
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
          <div className={ownClasses.inputField}>
            <TextField
              type="password"
              name="confirmedPassword"
              value={this.state.confirmedPassword}
              onChange={this.handleInputChange}
              placeholder="retype your password"
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
              Register
            </Button>
          </div>
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startRegister: userCredentials => dispatch(startRegister(userCredentials))
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
)(RegisterUser)
