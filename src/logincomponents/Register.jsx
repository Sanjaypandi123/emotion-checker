import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Swal from 'sweetalert2';

const Register = () => {

    const formref = useRef(null)

     const [cpass, setCpass] = useState("")

     const nav=useNavigate()

     function loginNav(){
        nav('/')
     }

    const HandelSubmit = async (e) => {
    e.preventDefault()

    if (!formref.current) {
        alert("Form not ready")
        return
    }

    try {
        const { uname, umail, unum, upass, ucpass, role } = formref.current

        if (upass.value !== ucpass.value) {
            alert("Passwords do not match ❌")
            return
        }

        let patientObj = {
            patientName: uname.value,
            email: umail.value,
            mobile: unum.value,
            password: upass.value,
            role: role.value,
        }

        const res = await fetch("http://localhost:7000/patient", {
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
        setTimeout(() => {
            loginNav()
        }, 2000);

        formref.current.reset()

    } catch (err) {
        console.log("Error:", err)
        alert("Error: " + err.message)
    }
}
    
    // const HandelSubmit = (e) => {
    //     e.preventDefault()

    //     if(formref.current.upass.value!==formref.current.ucpass.value){
    //         setCpass("Enter your correct Confirm Password")
    //     }
    //     else{
    //         let obj={
    //             UNAME:formref.current.uname.value,
    //             UEMAIL:formref.current.umail.value,
    //             UNUMBER:formref.current.unum.value,
    //             ROLE:formref.current.role.value,
    //             PASS:formref.current.upass.value,
    //             CPASS:formref.current.ucpass.value
    //         }
    //         setCpass("")

    //         const infos=[...logininfo,obj]
    //         setLogininfo(infos)

    //         loginNav()
            
    //         formref.current.reset()

    //         console.log(logininfo);
            
            
    //     } 
    // }

  return (
    <>
    
        <div className="regiter-box">
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
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
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
                            <span>{cpass}</span>
                        </div>

                        <button type='submit'>Register</button>
                        <h5> Already registered user go <Link to='/'>Login</Link> </h5>
                    </form>
            </div>
        </div>

    </>
  )
}

export default Register