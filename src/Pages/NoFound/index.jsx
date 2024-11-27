import React from 'react'
import { Link } from 'react-router-dom'

const NoFound = () => {
  return (
    <div>
      Page not Found
      <Link to={'/admin/'}>Dashboard</Link>
    </div>
  )
}

export default NoFound
