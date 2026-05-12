import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Register = () => {

    const formref = useRef(null)

    const nav = useNavigate()

    const [errors, setErrors] = useState({})

    function loginNav() {
        nav('/')
    }

    const HandelSubmit = async (e) => {
        e.preventDefault()

        const { uname, umail, unum, upass, ucpass, role } = formref.current

        let newErrors = {}

        // Name Validation
        if (uname.value.trim() === "") {
            newErrors.uname = "Name is required"
        }

        // Phone Validation
        if (!/^[0-9]{10}$/.test(unum.value)) {
            newErrors.unum = "Phone number must be 10 digits"
        }

        // Email Validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(umail.value)) {
            newErrors.umail = "Enter a valid email"
        }

        // Password Validation
        if (upass.value.length < 6) {
            newErrors.upass = "Password must be at least 6 characters"
        }

        // Confirm Password Validation
        if (upass.value !== ucpass.value) {
            newErrors.ucpass = "Passwords do not match"
        }

        // Role Validation
        if (role.value === "") {
            newErrors.role = "Please select a role"
        }

        // If errors exist stop submit
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Clear errors
        setErrors({})

        try {

            let patientObj = {
                patientName: uname.value,
                email: umail.value,
                mobile: unum.value,
                password: upass.value,
                role: role.value,
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
            })

            formref.current.reset()

            setTimeout(() => {
                loginNav()
            }, 2000)

        } catch (err) {
            console.log("Error:", err)
            alert("Error: " + err.message)
        }
    }

    return (
        <>
            <div className="regiter-box">
                <div className="form-box">

                    <form ref={formref} onSubmit={HandelSubmit}>

                        <h1>REGISTER</h1>

                        <div className="tag">
                            <label htmlFor="uname">Name</label>

                            <input
                                type="text"
                                id='uname'
                                name='uname'
                                placeholder='Enter Your Name'
                            />

                            <span className='error'>{errors.uname}</span>
                        </div>

                        <div className="tag">
                            <label htmlFor="unum">Phone No</label>

                            <input
                                type="number"
                                id='unum'
                                name='unum'
                                placeholder='Enter Your Phone Number'
                            />

                            <span className='error'>{errors.unum}</span>
                        </div>

                        <div className="tag">
                            <label>Role</label>

                            <select name="role">
                                <option value="">Select the Role</option>
                                <option value="ADMIN">DOCTOR</option>
                                <option value="USER">PATIENT</option>
                            </select>

                            <span className='error'>{errors.role}</span>
                        </div>

                        <div className="tag">
                            <label htmlFor="umail">E-Mail</label>

                            <input
                                type="email"
                                id='umail'
                                name='umail'
                                placeholder='Enter Your Email'
                            />

                            <span className='error'>{errors.umail}</span>
                        </div>

                        <div className="tag">
                            <label htmlFor="upass">Password</label>

                            <input
                                type="password"
                                id='upass'
                                name='upass'
                                placeholder='Enter Your Password'
                            />

                            <span className='error'>{errors.upass}</span>
                        </div>

                        <div className="tag">
                            <label htmlFor="ucpass">Confirm Password</label>

                            <input
                                type="password"
                                id='ucpass'
                                name='ucpass'
                                placeholder='Re Enter Your Password'
                            />

                            <span className='error'>{errors.ucpass}</span>
                        </div>

                        <button type='submit'>Register</button>

                        <h5>
                            Already registered user go <Link to='/'>Login</Link>
                        </h5>

                    </form>

                </div>
            </div>
        </>
    )
}

export default Register