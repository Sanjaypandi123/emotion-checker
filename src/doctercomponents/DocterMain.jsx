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
  const [errors, setErrors] = useState({});

  const formref = useRef(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedUser(user);
  }, []);

  const HandelSubmit = async (e) => {
    e.preventDefault();

    if (!formref.current) return;

    const { uname, umail, unum, upass, ucpass, role } = formref.current;

    let newErrors = {};

    // Name validation
    if (!uname.value.trim()) {
      newErrors.uname = "Name is required";
    }

    // Phone validation (10 digits)
    if (!/^[0-9]{10}$/.test(unum.value)) {
      newErrors.unum = "Phone number must be 10 digits";
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(umail.value)) {
      newErrors.umail = "Invalid email format";
    }

    // Password validation
    if (upass.value.length < 6) {
      newErrors.upass = "Password must be at least 6 characters";
    }

    // Confirm password validation
    // if (upass.value !== ucpass.value) {
    //   newErrors.ucpass = "Passwords do not match";
    // }

    // Role validation
    if (!role.value) {
      newErrors.role = "Please select role";
    }

    // If errors exist stop submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // clear previous errors

    try {

      let patientObj = {
        patientName: uname.value,
        email: umail.value,
        mobile: unum.value,
        password: upass.value,
        role: role.value,
        docterID: loggedUser?._id
      }

      const res = await fetch("https://emotion-checker-backend.onrender.com/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(patientObj)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      Swal.fire({
        title: 'Success!',
        text: 'Registered Successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      formref.current.reset();
      setOpenregister(false);

    } catch (err) {
      setErrors({ api: err.message });
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

            {openregister && (
              <div className="addingpatient-popup">
                <button
                  className='closebtn'
                  onClick={() => {
                    setOpenregister(false);
                    setErrors({});
                  }}
                >
                  X
                </button>

                <div className="form-box">
                  <form ref={formref} onSubmit={HandelSubmit}>
                    <h1>REGISTER</h1>

                    

                    {/* Name */}
                    <div className="tag">
                      <label>Name</label>
                      <input
                        type="text"
                        name="uname"
                        placeholder="Enter Your Name"
                      />
                      {errors.uname && <span className="error">{errors.uname}</span>}
                    </div>

                    {/* Phone */}
                    <div className="tag">
                      <label>Phone No</label>
                      <input
                        type="text"
                        name="unum"
                        placeholder="Enter Your Phone Number"
                      />
                      {errors.unum && <span className="error">{errors.unum}</span>}
                    </div>

                    {/* Role */}
                    <div className="tag">
                      <label>Role</label>
                      <select name="role">
                        <option value="">Select the Role</option>
                        <option value="USER">PATIENT</option>
                      </select>
                      {errors.role && <span className="error">{errors.role}</span>}
                    </div>

                    {/* Email */}
                    <div className="tag">
                      <label>Email</label>
                      <input
                        type="text"
                        name="umail"
                        placeholder="Enter Your Email"
                      />
                      {errors.umail && <span className="error">{errors.umail}</span>}
                    </div>

                    {/* Password */}
                    <div className="tag">
                      <label>Password</label>
                      <input
                        type="password"
                        name="upass"
                        placeholder="Enter Your Password"
                      />
                      {errors.upass && <span className="error">{errors.upass}</span>}
                    </div>

                    {/* Confirm Password */}
                    {/* <div className="tag">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="ucpass"
                        placeholder="Re Enter Your Password"
                      />
                      {errors.ucpass && <span className="error">{errors.ucpass}</span>}

                    </div> */}
                    {/* API Error */}
                    {errors.api && <span className="error">{errors.api}</span>}

                    <button type='submit'>Register</button>

                  </form>
                </div>
              </div>
            )}
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