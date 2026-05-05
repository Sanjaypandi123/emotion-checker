import React, { useEffect, useState } from "react";
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

const PatientCharts = ({ patientchart }) => {
  const [pDet, setpDet] = useState([]);

  const fetchPatientsEmotions = async () => {
    try {
      let res = await fetch(
        `http://localhost:7000/emotions/${patientchart}`
      );
      let data = await res.json();

      if (!res.ok) {
        alert("patients detail not fetched");
        return;
      }

      setpDet(data.response);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (patientchart) fetchPatientsEmotions();
  }, [patientchart]);

  /* =========================
     📊 PIE CHART DATA
  ========================= */

  const emotionSummary = [];

  pDet.forEach((item) => {
    const existing = emotionSummary.find(
      (e) => e.name === item.emotion
    );

    if (existing) {
      existing.value += item.percentage;
    } else {
      emotionSummary.push({
        name: item.emotion,
        value: item.percentage,
      });
    }
  });

  /* =========================
     📈 LINE CHART DATA
  ========================= */

  const lineData = pDet.map((item) => ({
    time: item.time,
    percentage: item.percentage,
  }));

  const COLORS = [
    "#3f6db3",
    "#2e5da8",
    "#5b8def",
    "#889df5",
    "#9db4ff",
  ];

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Mood Tracking Chart</h3>
        <select>
          <option>2022-12-15</option>
        </select>
      </div>


      <div className="chart-body two-column">

        {/* ===== LEFT COLUMN (PIE) ===== */}
        <div className="chart-left">
          <h4>Emotion Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={emotionSummary}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {emotionSummary.map((entry, index) => (
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

        {/* ===== RIGHT COLUMN (LINE) ===== */}
        <div className="chart-right">
          <h4>Emotion Percentage Over Time</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="percentage"
                stroke="#3f6db3"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
      <div className="chart-footer">
        <button>Previous Day</button>
        <button>Next Day</button>
      </div>
    </div>
  );
};

export default PatientCharts;