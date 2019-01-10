import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TaskStage from '../task-stage/TaskStage'
import { getTasksByCategory } from '../../../selectors/tasks'
import getCurrentProject from '../../../selectors/projects'

const Project = props => {
  const { title, description } = props.project
  const projectId = props.project._id
  const { mappedTasksStages } = props
  return (
    <div>
      <h1>{title}</h1>
      <h3> - {description} - </h3>
      <Link to={`/dashboard/projects/${projectId}/edit`} onClick={() => {}}>
        Edit Project
      </Link>
      {mappedTasksStages.map(taskStage => (
        <TaskStage
          key={taskStage.category}
          {...taskStage}
          projectId={projectId}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (state, props) => {
  const { projects, tasks } = state
  const { projectId } = props.match.params
  return {
    project: getCurrentProject(projects, projectId),
    mappedTasksStages: [
      {
        stage: 'Todo',
        category: 'todo',
        tasks: getTasksByCategory(tasks, 'todo', projectId),
        options: ['in_progress', 'completed', 'needs_rework']
      },
      {
        stage: 'In Progress',
        category: 'in_progress',
        tasks: getTasksByCategory(tasks, 'in_progress', projectId),
        options: ['todo', 'completed', 'needs_rework']
      },
      {
        stage: 'Completed',
        category: 'completed',
        tasks: getTasksByCategory(tasks, 'completed', projectId),
        options: ['todo', 'in_progress', 'needs_rework']
      },
      {
        stage: 'Needs Rework',
        category: 'needs_rework',
        tasks: getTasksByCategory(tasks, 'needs_rework', projectId),
        options: ['todo', 'in_progress', 'completed']
      }
    ]
  }
}

export default connect(mapStateToProps)(Project)
