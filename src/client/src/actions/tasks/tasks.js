import {
  SET_TASKS,
  REMOVE_TASKS_ON_LOGOUT,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK
} from '../types'
import axios from 'axios'

const addTask = task => ({
  type: ADD_TASK,
  payload: {
    task
  }
})

const startAddTask = ({ title, category, correspondingProject }) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth
    const taskData = { title, category }
    const results = await axios.post(
      `/projects/${correspondingProject}/tasks/new`,
      taskData,
      { headers: { auth: token } }
    )
    dispatch(addTask(results.data.task))
  }
}

const editTask = (editedTask, _id) => ({
  type: EDIT_TASK,
  payload: {
    editedTask,
    _id
  }
})

const startEditTask = (updates, projectId, taskId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth
    const results = await axios.patch(
      `/projects/${projectId}/tasks/${taskId}`,
      updates,
      { headers: { auth: token } }
    )
    dispatch(editTask(results.data.task, results.data.task._id))
  }
}

const deleteTask = _id => ({
  type: DELETE_TASK,
  payload: {
    _id
  }
})

const startDeleteTask = (projectId, taskId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth
    const results = await axios.delete(
      `/projects/${projectId}/tasks/${taskId}`,
      { headers: { auth: token } }
    )
    dispatch(deleteTask(results.data.taskId))
  }
}

const setTasks = tasks => ({
  type: SET_TASKS,
  payload: {
    tasks
  }
})

const removeTaskOnLogout = () => ({
  type: REMOVE_TASKS_ON_LOGOUT
})

export {
  setTasks,
  removeTaskOnLogout,
  startAddTask,
  startEditTask,
  startDeleteTask
}
