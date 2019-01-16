import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Footer from '../project-management-app/components/footer/Footer'

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <>
          <Component {...props} /> <Footer />
        </>
      )
    }
  />
)

const mapStateToProps = state => ({
  isAuthenticated: state.auth.loggedIn
})

export default connect(mapStateToProps)(PublicRoute)
