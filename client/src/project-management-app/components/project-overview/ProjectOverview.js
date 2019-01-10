import React from 'react'
import { Link } from 'react-router-dom'

const ProjectOverview = ({ title, description, _id }) => (
  <div>
    <Link to={`/dashboard/projects/${_id}`}>
      <h1>{title}</h1>
    </Link>
    <p>{description}</p>
  </div>
)

export default ProjectOverview
