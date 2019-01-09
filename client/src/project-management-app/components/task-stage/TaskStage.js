import React from 'react'
import TaskPreview from '../task-preview/TaskPreview'

const TaskStage = props => (
  <div>
    <h1>{props.stage}</h1>
    {props.tasks.length > 0 ? (
      props.tasks.map(task => (
        <TaskPreview key={task._id} {...task}>
          {task.title}
        </TaskPreview>
      ))
    ) : (
      <p>No tasks in this stage</p>
    )}
  </div>
)

export default TaskStage
