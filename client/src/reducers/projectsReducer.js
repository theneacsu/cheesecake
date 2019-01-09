import {
  SET_PROJECTS,
  ADD_PROJECT,
  REMOVE_PROJECTS_ON_LOGOUT
} from '../actions/types'

const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return [...state, action.payload.project]
    case REMOVE_PROJECTS_ON_LOGOUT:
      return []
    case SET_PROJECTS:
      return action.payload.projects
    default:
      return state
  }
}

export default projectsReducer
