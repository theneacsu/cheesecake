import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = props => {
  return (
    <div>
      <h1>Cheesecake</h1>
      <Link to="/users/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Homepage
