import axios from 'axios'
import { LOGIN, LOGOUT, LOGIN_FAILED } from '../types'
import { setProjects, removeProjectsOnLogout } from '../projects/projects'
import { setTasks, removeTaskOnLogout } from '../tasks/tasks'

const login = ({ token, email, id }) => ({
  type: LOGIN,
  payload: {
    loggedIn: true,
    loginFailed: '',
    token,
    email,
    id
  }
})

const loginFailed = reason => ({
  type: LOGIN_FAILED,
  payload: {
    reason
  }
})

const logout = () => ({
  type: LOGOUT
})

const startLogout = () => {
  return (dispatch, getState) => {
    dispatch(removeProjectsOnLogout())
    dispatch(removeTaskOnLogout())
    dispatch(logout())
  }
}

const automaticLogin = () => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem('token-clone57')
    const userId = localStorage.getItem('id-clone57')
    const results = await axios.get(`/users/${userId}`, {
      headers: { auth: token }
    })
    const { email, id, projects, tasks } = results.data
    dispatch(login({ email, id, token }))
    dispatch(setProjects(projects))
    dispatch(setTasks(tasks))
  }
}

const startRegister = userCredentials => {
  return async (dispatch, getState) => {
    const { password, confirmedPassword } = userCredentials
    const emailAddress = userCredentials.email
    try {
      const results = await axios.post('/register', {
        email: emailAddress,
        password,
        confirmedPassword
      })

      console.log(results.data)

      const { token } = results.data
      const { email, id } = results.data.user
      dispatch(login({ token, email, id }))
      localStorage.setItem('token-clone57', token)
      localStorage.setItem('id-clone57', id)
      localStorage.setItem('email-clone57', email)
    } catch (err) {
      dispatch(loginFailed('Email already taken '))
    }
  }
}

const startLogin = userCredentials => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = userCredentials
      const results = await axios.post('/login', { email, password })

      const { token } = results.data
      const userId = results.data.user.id

      const resultsAll = await axios.get(`/users/${userId}`, {
        headers: { auth: token }
      })

      const { email: emailAll, id, projects, tasks } = resultsAll.data
      dispatch(login({ email: emailAll, id, token }))
      dispatch(setProjects(projects))
      dispatch(setTasks(tasks))

      localStorage.setItem('token-clone57', token)
      localStorage.setItem('id-clone57', id)
      localStorage.setItem('email-clone57', email)
    } catch (err) {
      dispatch(loginFailed('Wrong credentials'))
    }
  }
}

export { automaticLogin, startRegister, startLogin, startLogout }
