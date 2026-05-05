import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientNames = ({ patients,setPatients, patientchart, setPatientchart }) => {

  



  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await fetch("http://localhost:7000/patients");

      const data = await res.json()
      if (!res.ok) {
        alert("patient not fetched")
        return
      }
      setPatients(data.response);
      setPatientchart(data.response[0]._id)

      console.log("RESPONSE ARRAY:", data.response);  // 🔥 add this

    } catch (err) {
      console.log("Error fetching:", err);
    }
  };



  console.log(patientchart);




  return (
    <div className="patient-overview">
      <h3>Patient Overview</h3>

      <ul>
        {patients
          .filter((p) => p.role === "USER")
          .map((p) => (
            <li
              key={p._id}
              className={patientchart === p._id ? "active" : ""}
              onClick={() => setPatientchart(p._id)}
            >
              {p.patientName || p.Name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PatientNames;