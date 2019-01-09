import { SET_TASKS, REMOVE_TASKS_ON_LOGOUT } from '../types'

const setTasks = tasks => ({
  type: SET_TASKS,
  payload: {
    tasks
  }
})

const removeTaskOnLogout = () => ({
  type: REMOVE_TASKS_ON_LOGOUT
})

export { setTasks, removeTaskOnLogout }
