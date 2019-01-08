import axios from 'axios'
import { LOGIN, LOGOUT, LOGIN_FAILED } from '../types'
import { setProjects } from '../projects/projects'

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

const automaticLogin = () => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem('token-clone57')
    const results = await axios.get('/projects/all', {
      headers: { auth: token }
    })
    console.log(results.data.projects)
    const { email, id } = results.data.user
    const { projects } = results.data
    dispatch(login({ email, id, token }))
    dispatch(setProjects(projects))
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

const startLogin = ({ email, password }) => {
  return async (dispatch, getState) => {
    axios
      .post('/login', { email, password })
      .then(res => {
        const { token } = res.data
        const { email, id } = res.data.user
        dispatch(login({ token, email, id }))
        localStorage.setItem('token-clone57', res.data.token)
        localStorage.setItem('id-clone57', res.data.user.id)
        localStorage.setItem('email-clone57', res.data.user.email)
      })
      .catch(err => {
        if (err.response.data.wrongCredentials) {
          dispatch(loginFailed('Wrong credentials'))
        }
      })
  }
}

export { logout, automaticLogin, startRegister, startLogin }
