// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import store from './store/store'
import ProjectManagementApp from './project-management-app/ProjectManagementApp'
import { automaticLogin } from './actions/auth/auth'

async function automaticLoginOnStart() {
  const root = document.querySelector('#root')
  if (root !== null) {
    try {
      await store.dispatch(automaticLogin())
    } catch (err) {}
    ReactDOM.render(<ProjectManagementApp />, root)
  }
}

automaticLoginOnStart()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
