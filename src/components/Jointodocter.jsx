import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

const Jointodocter = () => {

    const formref = useRef(null)

    const nav = useNavigate()

    function Godashboard() {
        nav('main')
    }

    const userid = JSON.parse(localStorage.getItem("user"));

    const userJoining = async (e) => {
        e.preventDefault()

        const { docterid } = formref.current
        const DOCTERID = docterid.value

        try {
            const res = await fetch(
                `http://localhost:7000/patient/join/${userid._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ docterid: DOCTERID })
                }
            )

            const text = await res.text()

            if (!res.ok) {
                throw new Error(text)
            }

            const data = JSON.parse(text)

            Swal.fire({
                title: "Success!",
                text: data.message,
                icon: "success",
                confirmButtonText: "OK"
            })

            setTimeout(() => {
                nav("main")
            }, 1500)

        } catch (err) {
            console.log("Error:", err)
            alert("Error: " + err.message)
        }
    }

    return (
        <>

            <div className="join-box">

                <form ref={formref} onSubmit={(e) => userJoining(e)}>
                    <div className="tag">
                        <label htmlFor="docterid">Docter ID</label>
                        <input type="text"
                            id='docterid'
                            name='docterid'
                            placeholder='Enter Your Docter ID'
                            required
                        />
                    </div>
                    <button type='submit'>Join</button>
                </form>

            </div>

        </>
    )
}

export default Jointodocter