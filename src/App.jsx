import React, { useEffect, useState } from "react";
import './App.css'


import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);


import Second from './components/Secondemo'
import First from './components/Firstemo'
import Thirdemo from "./components/Thirdemo";
import Fourthemo from "./components/Fourthemo";
import Fifthemo from "./components/Fifthemo";


import swal from 'sweetalert2';


function App() {

  const [moods, setMoods] = useState(JSON.parse(localStorage.getItem("moods")) ||[]);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem("moods", JSON.stringify(moods)) || [];
  }, [moods]);


  const addMood = (value) => {
    const today = new Date().toLocaleDateString();


    const already = moods.find((m) => m.date === today);
    if (already) {
      swal.fire({
        title: "Oops!",
        text: "Today Your Emotion are Already Added",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }
    else {
      swal.fire({
        title: "Success!",
        text: "Your Emotion was Added successfully",
        icon: "success",
        confirmButtonText: "OK"
      });

    }

    const updated = [...moods, { date: today, mood: value }];


    if (updated.length > 7) updated.shift();

    setMoods(updated);
  };


  const chartData = {
    labels: moods.map((m) => m.date),
    datasets: [
      {
        label: "Weekly Mood",
        data: moods.map((m) => m.mood),
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const HANDLEOPEN = () => {
    setOpen(true)
  }


  const analyze = () => {
    if (moods.length === 0) return "";

    const avg = moods.reduce((sum, m) => sum + m.mood, 0) / moods.length;
    if (moods.length === 7) {
    if (avg >= 75) return "😍 Happy Week";
    if (avg >= 50) return "😌 Normal Week";
    return "😡 Bad Week";
  }
  if(moods.length > 1){
    if (avg >= 75) return "😍 Happy days";
  if (avg >= 50) return "😌 Normal days";
  return "😡 Bad days";
  }
  if(moods.length === 1){
    if (avg >= 75) return "😍 Happy day";
  if (avg >= 50) return "😌 Normal day";
  return "😡 Bad day";
  }
};





return (
  <>
    <div className="container">
      <div className="wrapper">
        <div className="header">
          <h1>Emotion Tracker</h1>
          <p>Track your daily mood & analyze your week</p>
        </div>


        <div className="emoji-section">

          <button onClick={() => addMood(100)}><First /></button>
          <button onClick={() => addMood(75)}><Second /></button>
          <button onClick={() => addMood(50)}><Thirdemo /></button>
          <button onClick={() => addMood(25)}><Fourthemo /></button>
          <button onClick={() => addMood(0)}><Fifthemo /></button>



        </div>
        <div className="BTN">

          <div className="action">
            {/* {moods.length===7 ? <button className="view-btn" onClick={() => HANDLEOPEN()}>View Emotions</button> : ""} */}
            <button className="view-btn" onClick={() => HANDLEOPEN()}>View Emotions</button>
          </div>
        </div>
      </div>





      {open && (<div className="popup-overlay">

        <div className="popup-box">

          <button className="close-btn" onClick={() => setOpen(false)}>X</button>

          <h2>Your Last 7 Days Emotions</h2>



          <div className="crt" >
            <Line data={chartData} />
          </div>


          <h2>{analyze()}</h2>

        </div>

      </div>)}
    </div>

  </>
);
}

export default App
