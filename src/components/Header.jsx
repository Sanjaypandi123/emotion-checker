import React from "react";

const Header = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const patientname = storedUser?.patientName;

  return (
    <header className="dashboard-header">
      <h2>Patient Emotion Dashboard</h2>
      <h3>{patientname}</h3>
    </header>
  );
};

export default Header;