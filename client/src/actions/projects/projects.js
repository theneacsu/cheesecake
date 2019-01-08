import { SET_PROJECTS } from '../types'

const setProjects = projects => ({
  type: SET_PROJECTS,
  payload: {
    projects
  }
})

export { setProjects }
