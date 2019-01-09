import React from 'react'
import { Link } from 'react-router-dom'

const TaskPreview = props => (
  <div>
    <Link to={`/dashboard/projects/${props.correspondingProject}/${props._id}`}>
      <p>{props.title}</p>
    </Link>
  </div>
)

export default TaskPreview
