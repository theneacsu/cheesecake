import React, { Component } from 'react'
import validator from 'validator'
import _ from 'lodash'
import { connect } from 'react-redux'
import { startRegister } from '../../../actions/auth/auth'

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
    return (
      <div>
        <h1>Create your account</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            placeholder="ex: james@bond.com"
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            placeholder="type your password"
          />
          <input
            type="password"
            name="confirmedPassword"
            value={this.state.confirmedPassword}
            onChange={this.handleInputChange}
            placeholder="retype your password"
          />
          <button>Register</button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterUser)
