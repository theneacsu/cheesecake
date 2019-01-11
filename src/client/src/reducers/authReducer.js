import _ from 'lodash'
import { LOGIN, LOGOUT, LOGIN_FAILED } from '../actions/types'

const initialState = {
  loggedIn: false,
  token: '',
  email: '',
  id: '',
  loginFailed: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const newState = _.pick(action.payload, [
        'loggedIn',
        'token',
        'email',
        'id',
        'loginFailed'
      ])
      return newState
    case LOGOUT:
      return initialState
    case LOGIN_FAILED:
      return {
        ...initialState,
        loginFailed: action.payload.reason
      }
    default:
      return state
  }
}

export default authReducer
