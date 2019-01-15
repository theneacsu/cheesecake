import React from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { startLogout } from '../../../actions/auth/auth'
import ownClasses from './Header.module.css'

const Header = props => {
  const { classes, loggedIn, email } = props
  const header = loggedIn ? (
    <div className={ownClasses.appBar}>
      <Typography
        variant="h6"
        color="inherit"
        className={[ownClasses.menuItem, classes.dashboardItem].join(' ')}
      >
        <Link to="/dashboard" className={ownClasses.link}>
          Dashboard
        </Link>
      </Typography>
      <Typography
        variant="h6"
        color="inherit"
        className={[
          ownClasses.menuItem,
          classes.emailItem,
          classes.displayNone
        ].join(' ')}
      >
        <span className={ownClasses.email}>{email}</span>
      </Typography>
      <Typography
        variant="h6"
        color="inherit"
        className={[
          ownClasses.menuItem,
          classes.logoutItem,
          classes.email
        ].join(' ')}
      >
        <Link
          className={[ownClasses.link].join(' ')}
          to="/"
          onClick={() => {
            props.startLogout()
            localStorage.setItem('token-clone57', '')
            localStorage.setItem('email-clone57', '')
            localStorage.setItem('id-clone57', '')
          }}
        >
          Logout
        </Link>
      </Typography>
    </div>
  ) : (
    <Typography variant="h5" color="secondary" className={classes.link}>
      <Link to="/dashboard" className={ownClasses.link}>
        Clone 57
      </Link>
    </Typography>
  )

  return header
}

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
})

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  email: state.auth.email
})

const styles = theme => ({
  link: {
    textAlign: 'center',
    marginTop: '2rem'
  },
  dashboardItem: {
    padding: '0 1rem 0 3rem',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      borderBottom: '1px solid white',
      width: '50%',
      margin: '0 auto',
      padding: '0rem'
    }
  },
  logoutItem: {
    padding: '0 3em 0 1rem',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      borderBottom: '1px solid white',
      padding: '0rem',
      width: '50%',
      margin: '0 auto'
    }
  },
  emailItem: {
    padding: '0'
  },
  displayNone: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Header)
