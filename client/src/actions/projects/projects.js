import axios from 'axios'
import {
  SET_PROJECTS,
  ADD_PROJECT,
  REMOVE_PROJECTS_ON_LOGOUT,
  DELETE_PROJECT
} from '../types'

const addProject = project => ({
  type: ADD_PROJECT,
  payload: {
    project
  }
})

const deleteProject = id => ({
  type: DELETE_PROJECT,
  payload: {
    id
  }
})

const startDeleteProject = id => {
  return async (dispatch, getState) => {
    const result = await axios.delete('')
  }
}

const removeProjectsOnLogout = () => ({
  type: REMOVE_PROJECTS_ON_LOGOUT
})

const startAddProject = ({ title, description }) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const results = await axios.post(
      '/projects/new',
      { title, description },
      { headers: { auth: token } }
    )
    const project = results.data.project
    dispatch(addProject(project))
  }
}

const setProjects = projects => ({
  type: SET_PROJECTS,
  payload: {
    projects
  }
})

export { setProjects, addProject, startAddProject, removeProjectsOnLogout }
