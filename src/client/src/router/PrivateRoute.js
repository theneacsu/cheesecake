import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../project-management-app/components/header/Header'
import Footer from '../project-management-app/components/footer/Footer'

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <>
          <Header />
          <Component {...props} />
          <Footer />
        </>
      ) : (
        <Redirect to="/" />
      )
    }
  />
)

const mapStateToProps = state => ({
  isAuthenticated: state.auth.loggedIn
})

export default connect(mapStateToProps)(PrivateRoute)
