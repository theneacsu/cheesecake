import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TaskStage from '../task-stage/TaskStage'
import { getTasksByCategory } from '../../../selectors/tasks'
import { startDeleteProject } from '../../../actions/projects/projects'
import getCurrentProject from '../../../selectors/projects'

const Project = props => {
  const { todoTasks, inProgressTasks, completedTasks, needsReworkTasks } = props
  const { title, description } = props.project
  const projectId = props.project._id
  return (
    <div>
      <h1>{title}</h1>
      <h3> - {description} - </h3>
      <Link to="/dashboard" onClick={() => props.startDeleteProject(projectId)}>
        Delete Project
      </Link>
      <TaskStage stage="Todo" tasks={todoTasks} />
      <TaskStage stage="In Progress" tasks={inProgressTasks} />
      <TaskStage stage="Completed" tasks={completedTasks} />
      <TaskStage stage="Needs Rework" tasks={needsReworkTasks} />
    </div>
  )
}

const mapStateToProps = (state, props) => {
  const { projects, tasks } = state
  const { projectId } = props.match.params
  return {
    project: getCurrentProject(projects, projectId),
    todoTasks: getTasksByCategory(tasks, 'todo', projectId),
    inProgressTasks: getTasksByCategory(tasks, 'in_progress', projectId),
    completedTasks: getTasksByCategory(tasks, 'completed', projectId),
    needsReworkTasks: getTasksByCategory(tasks, 'needs_rework', projectId)
  }
}

const mapDispatchToProps = dispatch => ({
  startDeleteProject: id => dispatch(startDeleteProject(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project)
