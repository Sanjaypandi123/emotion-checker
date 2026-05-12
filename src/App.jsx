
import React, { useEffect, useRef, useState } from "react";
import "./logincomponents/Register.css"
import Register from "./logincomponents/Register.jsx";
import Login from "./logincomponents/Login.jsx";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import { Patient } from "./components/Patient.jsx";
import Docter from "./doctercomponents/Docter.jsx";





function App() {

  

  return (

    <>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/PatientDashboard/*" element={

          <Patient  />

        } />
        <Route path="/AdminDashboard/*" element={

          <Docter/>

        } />
      </Routes>


    </>
  )
}

export default App;