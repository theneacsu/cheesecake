import axios from "axios"
import {
  SET_PROJECTS,
  ADD_PROJECT,
  REMOVE_PROJECTS_ON_LOGOUT,
  DELETE_PROJECT,
  EDIT_PROJECT
} from "../types"

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

const startDeleteProject = id => async (dispatch, getState) => {
  const token = getState().auth.token
  const results = await axios.delete(`/projects/${id}`, {
    headers: { auth: token }
  })
  dispatch(deleteProject(results.data.projectId))
}

const removeProjectsOnLogout = () => ({
  type: REMOVE_PROJECTS_ON_LOGOUT
})

const startAddProject = ({ title, description }) => async (
  dispatch,
  getState
) => {
  const token = getState().auth.token
  const results = await axios.post(
    "/projects/new",
    { title, description },
    { headers: { auth: token } }
  )
  const project = results.data.project
  dispatch(addProject(project))
};

const editProject = (project, _id) => ({
  type: EDIT_PROJECT,
  payload: {
    project,
    _id
  }
})

const startEditProject = (updates, id) => async (dispatch, getState) => {
  const { token } = getState().auth
  const results = await axios.patch(`/projects/${id}`, updates, {
    headers: { auth: token }
  })

  dispatch(editProject(results.data.project, id))
};

const setProjects = projects => ({
  type: SET_PROJECTS,
  payload: {
    projects
  }
})

export {
  setProjects,
  addProject,
  startAddProject,
  removeProjectsOnLogout,
  startDeleteProject,
  startEditProject
}
