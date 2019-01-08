import { SET_PROJECTS } from '../actions/types'

const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return action.payload.projects
    default:
      return state
  }
}

export default projectsReducer
