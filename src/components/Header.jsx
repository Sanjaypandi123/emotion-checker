import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <Link to="/PatientDashboard">Join</Link>
      <Link to="/PatientDashboard/main">Dash</Link>
      <Link to="/PatientDashboard/chart">Chart</Link>
    </header>
  )
}

export default Header