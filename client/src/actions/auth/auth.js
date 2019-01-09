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
    const results = await axios.get('/users/user/allDetails', {
      headers: { auth: token }
    })
    const { email, id, projects, tasks } = results.data
    dispatch(login({ email, id, token }))
    dispatch(setProjects(projects))
    dispatch(setTasks(tasks))
  }
}

const startRegister = ({ email, password, confirmedPassword }) => {
  return async (dispatch, getState) => {
    axios
      .post('/users/register', { email, password, confirmedPassword })
      .then(res => {
        const { token } = res.data
        const { email, id } = res.data.user
        dispatch(login({ token, email, id }))
        localStorage.setItem('token-clone57', res.data.token)
        localStorage.setItem('id-clone57', res.data.user.id)
        localStorage.setItem('email-clone57', res.data.user.email)
      })
      .catch(err => {
        dispatch(loginFailed('Email already taken'))
      })
  }
}

const startLogin = userCredentials => {
  return async (dispatch, getState) => {
    const { email, password } = userCredentials
    const results = await axios.post('/login', { email, password })

    const { token } = results.data

    const resultsAll = await axios.get('/users/user/allDetails', {
      headers: { auth: token }
    })

    const { email: emailAll, id, projects, tasks } = resultsAll.data
    dispatch(login({ emailAll, id, token }))
    dispatch(setProjects(projects))
    dispatch(setTasks(tasks))

    localStorage.setItem('token-clone57', token)
    localStorage.setItem('id-clone57', id)
    localStorage.setItem('email-clone57', email)
  }
}

export { automaticLogin, startRegister, startLogin, startLogout }
