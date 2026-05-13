import React, { useEffect, useState } from "react";

const PatientNames = ({ patients,setPatients, patientchart, setPatientchart,openregister,setOpenregister }) => {

  
const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    fetchPatients();
  }, [openregister]);

  const fetchPatients = async () => {
    try {
      const res = await fetch(`https://emotion-checker-backend.onrender.com/patients/${user._id}`);

      const data = await res.json()
      if (!res.ok) {
        alert("patient not fetched")
        return
      }
      setPatients(data.response);
      
      let start=(data.response[0].role=="USER")?(data.response[0]):(data.response[1])
      setPatientchart(start._id)

      console.log("RESPONSE ARRAY:", data.response);  

    } catch (err) {
      console.log("Error fetching:", err);
    }
  };



  console.log("rerender");
  // console.log(patientchart);




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

          <li onClick={()=>setOpenregister(true)}>Add New Patient + </li>
      </ul>

      


    </div>
  );
};

export default PatientNames;