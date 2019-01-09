import { SET_TASKS, REMOVE_TASKS_ON_LOGOUT } from '../actions/types'

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TASKS:
      return action.payload.tasks
    case REMOVE_TASKS_ON_LOGOUT:
      return []
    default:
      return state
  }
}

export default tasksReducer
