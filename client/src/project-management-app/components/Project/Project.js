import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TaskStage from '../task-stage/TaskStage'
import getTasksByCategory from '../../../selectors/tasks'

const Project = props => {
  const { title } = props.match.params
  const { todoTasks, inProgressTasks, completedTasks, needsReworkTasks } = props
  return (
    <div>
      <h1>{title}</h1>
      <Link to="/dashboard">Delete Project</Link>
      <TaskStage stage="Todo" tasks={todoTasks} />
      <TaskStage stage="In Progress" tasks={inProgressTasks} />
      <TaskStage stage="Completed" tasks={completedTasks} />
      <TaskStage stage="Needs Rework" tasks={needsReworkTasks} />
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  todoTasks: getTasksByCategory(state.tasks, 'todo', props.match.params.id),
  inProgressTasks: getTasksByCategory(
    state.tasks,
    'in_progress',
    props.match.params.id
  ),
  completedTasks: getTasksByCategory(
    state.tasks,
    'completed',
    props.match.params.id
  ),
  needsReworkTasks: getTasksByCategory(
    state.tasks,
    'needs_rework',
    props.match.params.id
  )
})

export default connect(mapStateToProps)(Project)
