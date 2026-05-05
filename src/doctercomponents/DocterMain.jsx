import React, { useEffect, useState } from 'react'
import PatientNames from './PatientNames'
import PatientCharts from './PatientCharts'

const DocterMain = () => {

  const [patients, setPatients] = useState([]);
  const [patientchart, setPatientchart] = useState(null)
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedUser(user);
  }, []);

  console.log("Logged user:", loggedUser);

  return (
    <>

      <div className="dashboard">

        {/* Top Header */}
        <div className="topbar">
          <h2>Doctor Dashboard</h2>
          <div className="doctor-profile">
            {loggedUser && <h3>{loggedUser.patientName}</h3>}
          </div>
        </div>

        {/* Content Section */}
        <div className="content">

          {/* Left Panel */}
          <div className="left-panel">
            <PatientNames
              patients={patients}
              setPatients={setPatients}
              patientchart={patientchart}
              setPatientchart={setPatientchart}
            />
          </div>

          {/* Right Panel */}
          <div className="right-panel">
            {patientchart && (
              <PatientCharts
                patients={patients}
                setPatients={setPatients}
                patientchart={patientchart}
                setPatientchart={setPatientchart}
              />
            )}
          </div>

        </div>

      </div>

    </>
  )
}

export default DocterMain