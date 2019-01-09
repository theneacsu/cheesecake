const getTasksByCategory = (tasks, category, projectId) =>
  tasks.filter(
    task =>
      task.category === category && task.correspondingProject === projectId
  )

const getCurrentTask = (tasks, id) => tasks.find(task => task._id === id)

export { getTasksByCategory, getCurrentTask }
