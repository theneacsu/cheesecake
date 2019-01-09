const getCurrentProject = (projects, id) =>
  projects.find(project => project._id === id)

export default getCurrentProject
