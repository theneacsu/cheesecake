import React from 'react'
import AppRouter from '../router/AppRouter'
import { Provider } from 'react-redux'
import store from '../store/store.js'

const ProjectManagementApp = () => (
  <Provider store={store}>
    <div className="container">
      <AppRouter />
    </div>
  </Provider>
)

export default ProjectManagementApp
