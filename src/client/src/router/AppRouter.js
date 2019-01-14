import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Homepage from '../project-management-app/components/homepage/Homepage'
import RegisterUser from '../project-management-app/components/register-user/RegisterUser'
import Dashboard from '../project-management-app/components/dashboard/Dashboard'
import LoginUser from '../project-management-app/components/login-user/LoginUser'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import PublicRouteWithoutHeader from './PublicRouteWithoutHeader'
import Project from '../project-management-app/components/project/Project'
import CreateProject from '../project-management-app/components/create-project/CreateProject'
import EditTask from '../project-management-app/components/edit-task/EditTask'
import EditProject from '../project-management-app/components/edit-project/EditProject'
import Task from '../project-management-app/components/task/Task'
import ownClasses from './AppRouter.module.css'

const AppRouter = () => (
  <BrowserRouter>
    <div className={ownClasses.appWrapper}>
      <Switch>
        <PublicRouteWithoutHeader path="/" exact component={Homepage} />
        <PublicRoute path="/users/register" component={RegisterUser} />
        <PublicRoute path="/login" component={LoginUser} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute
          path="/dashboard/projects/new"
          exact
          component={CreateProject}
        />
        <PrivateRoute
          path="/dashboard/projects/:projectId"
          component={Project}
          exact
        />
        <PrivateRoute
          path="/dashboard/projects/:projectId/edit"
          component={EditProject}
        />
        <PrivateRoute
          path="/dashboard/projects/:projectId/:taskId"
          component={Task}
          exact
        />
        <PrivateRoute
          path="/dashboard/projects/:projectId/:taskId/edit"
          component={EditTask}
        />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter
