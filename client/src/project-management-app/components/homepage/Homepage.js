import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => (
  <div>
    <h1>Cheesecake</h1>
    <Link to="/users/register">Create an account</Link>
    <Link to="/login">Login</Link>
  </div>
)

export default Homepage
