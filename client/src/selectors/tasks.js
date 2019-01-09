const getTaskByCategory = (tasks, category, projectId) =>
  tasks.filter(
    task =>
      task.category === category && task.correspondingProject === projectId
  )

export default getTaskByCategory
