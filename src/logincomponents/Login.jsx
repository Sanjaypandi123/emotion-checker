import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {

    const Formref = useRef(null)

    const nav = useNavigate()

    const [errors, setErrors] = useState({})

    function mainpage(user) {

        if (user.role === "USER") nav('/PatientDashboard')

        if (user.role === "ADMIN") nav('/AdminDashboard')
    }

    const HandelSubmit = async (e) => {

        e.preventDefault()

        const email = Formref.current.email.value
        const role = Formref.current.role.value
        const password = Formref.current.password.value

        let newErrors = {}

        // Email Validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter valid email"
        }

        // Role Validation
        if (role === "") {
            newErrors.role = "Please select role"
        }

        // Password Validation
        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        // Stop submit if errors exist
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Clear previous errors
        setErrors({})

        try {

            const res = await fetch("https://emotion-checker-backend.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password, role })
            })

            const data = await res.json()

            if (!res.ok) {

                // Backend error message
                setErrors({
                    api: data.message
                })

                return
            }

            localStorage.setItem("user", JSON.stringify(data.response))

            Swal.fire({
                title: 'Success!',
                text: 'Login successful!',
                icon: 'success',
                confirmButtonText: 'OK'
            })

            setTimeout(() => {
                mainpage(data.response)
            }, 2000)

        }

        catch (err) {

            setErrors({
                api: err.message
            })
        }
    }

    return (
        <>

            <div className="regiter-box">

                <div className="form-box">

                    <form ref={Formref} onSubmit={HandelSubmit}>

                        <h1>LOGIN</h1>



                        <div className="tag">

                            <label htmlFor="umail">E-Mail</label>

                            <input
                                type="email"
                                id='umail'
                                name='email'
                                placeholder='Enter Your Email'
                            />

                            <span className='error'>{errors.email}</span>

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

                            <label htmlFor="upass">Password</label>

                            <input
                                type="password"
                                id='upass'
                                name='password'
                                placeholder='Enter Your Password'
                            />

                            <span className='error'>{errors.password}</span>
                            <span className='error'>{errors.api}</span>

                        </div>

                        <button type='submit'>Login</button>

                        <h5>
                            New User Go <Link to='/Register'>register</Link>
                        </h5>

                    </form>

                </div>

            </div>

        </>
    )
}

export default Login