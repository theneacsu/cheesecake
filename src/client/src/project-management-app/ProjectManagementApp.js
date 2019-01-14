import React from 'react'
import AppRouter from '../router/AppRouter'
import { Provider } from 'react-redux'
import store from '../store/store.js'
import { MuiThemeProvider } from '@material-ui/core'
import theme from '../theme/Theme'
import './ProjectManagementApp.css'

const ProjectManagementApp = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <div className="container">
        <AppRouter />
      </div>
    </Provider>
  </MuiThemeProvider>
)

export default ProjectManagementApp
