import {
  SET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  REMOVE_PROJECTS_ON_LOGOUT,
  EDIT_PROJECT
} from '../actions/types'

const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return [...state, action.payload.project]
    case DELETE_PROJECT:
      return state.filter(project => project._id !== action.payload.id)
    case EDIT_PROJECT:
      return state.map(project => {
        if (project._id === action.payload._id) {
          return {
            ...project,
            ...action.payload.project
          }
        }
        return project
      })
    case REMOVE_PROJECTS_ON_LOGOUT:
      return []
    case SET_PROJECTS:
      return action.payload.projects
    default:
      return state
  }
}

export default projectsReducer
