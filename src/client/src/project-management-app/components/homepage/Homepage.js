import React from 'react'
import { Link } from 'react-router-dom'
import ownClasses from './Homepage.module.css'

const Homepage = props => {
  return (
    <div className={ownClasses.wrapper}>
      <h1 className={ownClasses.h1}>Clone 57</h1>
      <h2 className={ownClasses.h2}>
        Manage your personal projects more effectively
      </h2>
      <div className={ownClasses.linksArea}>
        <Link to="/users/register" className={ownClasses.Link}>
          <div className={ownClasses.linkDiv}>Register</div>
        </Link>
        <Link to="/login" className={ownClasses.Link}>
          <div className={ownClasses.linkDiv}>Login</div>
        </Link>
      </div>
    </div>
  )
}

export default Homepage
