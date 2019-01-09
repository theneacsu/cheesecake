import React from 'react'

const TaskStage = props => (
  <div>
    <h1>{props.stage}</h1>
    {props.tasks.length > 0 ? (
      props.tasks.map(task => <p key={task._id}>{task.title}</p>)
    ) : (
      <p>No tasks in this stage</p>
    )}
  </div>
)

export default TaskStage
