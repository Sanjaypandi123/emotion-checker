import React from "react";
import Header from "./Header";
import Mainpage from "./Mainpage";
import Chartss from "./Chartss";
import "../components/Patient.css";

export const Patient = () => {
  return (
    <div className="patient-dashboard">
      <div className="dashboard-wrapper">

        <Header />

        <div className="dashboard-body">
          <div className="left-panel">
            <Mainpage />
          </div>

          <div className="right-panel">
            <Chartss />
          </div>
        </div>

      </div>
    </div>
  );
};