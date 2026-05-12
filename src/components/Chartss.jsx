import React, { useState, useEffect } from "react";

import PatientCharts from "../doctercomponents/PatientCharts";

const Chartss = () => {
  

  const user = JSON.parse(localStorage.getItem("user"));
  const userid = user?._id;

  

  return (
  
  <>


    <PatientCharts patientchart={userid}/>

  </>
  );
};

export default Chartss;