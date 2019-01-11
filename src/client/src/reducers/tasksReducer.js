import {
  SET_TASKS,
  REMOVE_TASKS_ON_LOGOUT,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK
} from '../actions/types'

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload.task]
    case SET_TASKS:
      return action.payload.tasks
    case EDIT_TASK:
      return state.map(task => {
        if (task._id === action.payload.editedTask._id) {
          return {
            ...task,
            ...action.payload.editedTask
          }
        }
        return task
      })
    case DELETE_TASK:
      return state.filter(task => task._id !== action.payload._id)
    case REMOVE_TASKS_ON_LOGOUT:
      return []
    default:
      return state
  }
}

export default tasksReducer
