import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Homepage from '../project-management-app/components/homepage/Homepage'
import RegisterUser from '../project-management-app/components/register-user/RegisterUser'
import Dashboard from '../project-management-app/components/dashboard/Dashboard'
import Header from '../project-management-app/components/header/Header'
import LoginUser from '../project-management-app/components/login-user/LoginUser'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <PublicRoute path="/" exact component={Homepage} />
        <PublicRoute path="/users/register" component={RegisterUser} />
        <PublicRoute path="/login" component={LoginUser} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter
