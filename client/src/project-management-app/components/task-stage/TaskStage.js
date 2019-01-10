import React from 'react'
import TaskPreview from '../task-preview/TaskPreview'
import CreateTask from '../create-task/CreateTask'

const TaskStage = ({ stage, tasks, category, projectId, options }) => (
  <div>
    <h1>{stage}</h1>
    {tasks.length > 0 ? (
      tasks.map(task => (
        <TaskPreview key={task._id} _id={task._id} options={options}>
          {task.title}
        </TaskPreview>
      ))
    ) : (
      <p>No tasks in this stage</p>
    )}
    <CreateTask category={category} projectId={projectId} />
  </div>
)

export default TaskStage
