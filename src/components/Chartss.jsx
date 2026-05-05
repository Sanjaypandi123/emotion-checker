import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Chartss = () => {
  const [patientdata, setPatientdata] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userid = user?._id;

  const fetchuseremotions = async () => {
    try {
      let res = await fetch(`http://localhost:7000/emotions/${userid}`);
      let data = await res.json();

      if (!res.ok) {
        alert("patients detail not fetched");
        return;
      }

      setPatientdata(data.response);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (userid) fetchuseremotions();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4444"];

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* PIE CHART COLUMN */}
        <div>
          <h2 style={{ textAlign: "center" }}>Emotion Pie Chart</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={patientdata}
                dataKey="percentage"
                nameKey="emotion"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {patientdata.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LINE CHART COLUMN */}
        <div>
          <h2 style={{ textAlign: "center" }}>Emotion Trend</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={patientdata}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="percentage"
                stroke="#8884d8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Chartss;