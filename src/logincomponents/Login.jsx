import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

const Login = () => {
    const Formref = useRef("")


    const nav = useNavigate()

     function mainpage(user){
        debugger

        if(user.role==="USER") nav('/PatientDashboard')
         if(user.role==="ADMIN") nav('/AdminDashboard')

     }





    // const HandelSubmit = (e) => {
    //     e.preventDefault()


    //     let obj = logininfo?.find(e => e.UEMAIL == Formref.current.email.value)


    //     if (obj) {
    //         if ((obj.PASS == Formref.current.pass.value) && (obj.ROLE == Formref.current.role.value)) {

    //             Swal.fire({
    //                 title: 'Success!',
    //                 text: 'Your action was successful!',
    //                 icon: 'success',
    //                 confirmButtonText: 'OK'
    //             });

    //             setTimeout(() => {
    //                 mainpage(obj)
    //             }, 2000);
    //         }
    //     }
    // }

    const HandelSubmit = async(e) => {
        e.preventDefault()
        const email = Formref.current.email.value
        const role = Formref.current.role.value
        const password = Formref.current.password.value
       
        
        try {
            const res = await fetch("http://localhost:7000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password, role })
                
            })
            const data=await res.json()
            if (!res.ok) {
                alert(data.message)
                 return;
            }

            // if(data.response.password!=password){
            //     alert("Password mismatch")
            //     return
            // }
            
                localStorage.setItem("user",JSON.stringify(data.response))
                Swal.fire({
                    title: 'Success!',
                    text: 'Login successful!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                setTimeout(() => {
                    mainpage(data.response)
                }, 2000);


            
        }
        catch(err){
            alert(err.message)
        }
    }
    return (
        <>

            <div className="regiter-box">
                <div className="form-box">
                    <form ref={Formref} onSubmit={(e) => HandelSubmit(e)}>

                        <h1>LOGIN</h1>

                        <div className="tag">
                            <label htmlFor="umail">E-Mail</label>
                            <input type="email"
                                id='umail'
                                name='email'
                                placeholder='Enter Your Email'
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
                            <label htmlFor="upass">Password</label>
                            <input type="password"
                                id='upass'
                                name='password'
                                placeholder='Enter Your Password'
                                required
                            />
                        </div>
                        <button type='submit'>Login</button>

                        <h5>New User Go <Link to='/Register'>register</Link></h5>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login