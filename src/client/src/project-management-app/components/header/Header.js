import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../../../actions/auth/auth'

const Header = props => (
  <div>
    <Link to="/">Cheesecake</Link>
    {props.loggedIn && (
      <Link
        to="/"
        onClick={() => {
          props.startLogout()
          localStorage.setItem('token-clone57', '')
          localStorage.setItem('email-clone57', '')
          localStorage.setItem('id-clone57', '')
        }}
      >
        Log Out
      </Link>
    )}
  </div>
)

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
})

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
