import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Mainpage from './Mainpage'
import Chartss from './Chartss'
import Jointodocter from './Jointodocter'
import "../components/Patient.css"


export const Patient = () => {
  return (
    <div className="patient-dashboard">
      <div className="dashboard-wrapper">
        <Header />
        <Routes>
        <Route index element={<Jointodocter />} />
        <Route path="main" element={<Mainpage />} />
        <Route path="chart" element={<Chartss />} />
      </Routes>
      </div>
    </div>
  )
}
