import React, { useEffect, useRef, useState } from 'react'
import PatientNames from './PatientNames'
import PatientCharts from './PatientCharts'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const DocterMain = () => {

  const [patients, setPatients] = useState([]);
  const [patientchart, setPatientchart] = useState(null)
  const [loggedUser, setLoggedUser] = useState(null);

  const [openregister, setOpenregister] = useState(false)

  const formref = useRef(null)


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedUser(user);
  }, []);

  console.log("Logged user:", loggedUser);


  const HandelSubmit = async (e) => {
    e.preventDefault()

    if (!formref.current) {
      alert("Form not ready")
      return
    }

    try {
      const { uname, umail, unum, upass, ucpass, role } = formref.current

      if (upass.value !== ucpass.value) {
        alert("Passwords do not match ")
        return
      }

      let patientObj = {
        patientName: uname.value,
        email: umail.value,
        mobile: unum.value,
        password: upass.value,
        role: role.value,
        docterID:loggedUser._id
      }

      const res = await fetch("https://emotion-checker-backend.onrender.com/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(patientObj)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      Swal.fire({
        title: 'Success!',
        text: 'Registered Successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      formref.current.reset()
      setOpenregister(false)

    } catch (err) {
      console.log("Error:", err)
      alert("Error: " + err.message)
    }
  }

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
              openregister={openregister}
              setOpenregister={setOpenregister}

            />

            {
              (openregister) && (<div className="addingpatient-popup">
                <button className='closebtn' onClick={() => setOpenregister(false)}>X</button>
                {/* <div className="regiter-box docteradding"> */}
                  <div className="form-box">
                    <form ref={formref} onSubmit={(e) => HandelSubmit(e)}>
                      <h1>REGISTER</h1>
                      <div className="tag">
                        <label htmlFor="uname">Name</label>
                        <input type="text"
                          id='uname'
                          name='uname'
                          placeholder='Enter Your Name'
                          required
                        />
                      </div>

                      <div className="tag">
                        <label htmlFor="unum">Phone No</label>
                        <input type="text"
                          id='unum'
                          name='unum'
                          placeholder='Enter Your Phone Number'
                          required
                        />
                      </div>

                      <div className="tag">
                        <label htmlFor="">Role</label>
                        <select name="role" id="" required>
                          <option value="">Select the Role</option>
                          {/* <option value="ADMIN">DOCTER</option> */}
                          <option value="USER">PATIENT</option>
                        </select>
                      </div>

                      <div className="tag">
                        <label htmlFor="umail">E-Mail</label>
                        <input type="text"
                          id='umail'
                          name='umail'
                          placeholder='Enter Your Email'
                          required
                        />
                      </div>

                      <div className="tag">
                        <label htmlFor="upass">Password</label>
                        <input type="text"
                          id='upass'
                          name='upass'
                          placeholder='Enter Your Password'
                          required
                        />
                      </div>

                      <div className="tag">
                        <label htmlFor="ucpass">Confirm Password</label>
                        <input type="text"
                          id='ucpass'
                          name='ucpass'
                          placeholder='Re Enter Your Password'
                          required
                        />
                      </div>

                      <button type='submit'>Register</button>
                      
                    </form>
                  </div>
                {/* </div> */}
              </div>)
            }
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