import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

import "../components/Mainpage.css"

const Mainpage = () => {
  const webcamRef = useRef(null);

  // 11 slots (8AM–6PM)
  const hours = Array.from({ length: 15 }, (_, i) => i + 8);

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [emotion, setEmotion] = useState("Loading models...");
  const [detectionData, setDetectionData] = useState(null);

  const currentHour = new Date().getHours();
  const todayDate = new Date().toISOString().split("T")[0];

  // ✅ Generate 7 Days
  const generateWeek = () => {
    const today = new Date();
    const week = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      week.push({
        date: date.toISOString().split("T")[0],
        slots: hours.reduce((acc, hour) => {
          acc[hour] = null;
          return acc;
        }, {}),
      });
    }

    return week;
  };

  // ✅ ARRAY ONLY STRUCTURE
  const [peopleData, setPeopleData] = useState([
    {
      name: "Pandi",
      week: generateWeek(),
    },
  ]);

  console.log(peopleData);


  // ✅ Load Models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
      setEmotion("Ready to Detect");
    };
    loadModels();
  }, []);

  // ✅ Emoji
  const getEmoji = (emo) => {
    switch (emo) {
      case "happy": return "😄";
      case "sad": return "😢";
      case "angry": return "😡";
      case "fearful": return "😨";
      case "disgusted": return "🤢";
      case "surprised": return "😲";
      case "neutral": return "😐";
      default: return "🙂";
    }
  };

  // ✅ Detect Emotion
  const detectEmotion = async () => {
    if (!modelsLoaded) return alert("Models loading...");
    if (!webcamRef.current?.video) return alert("Camera not ready");

    const video = webcamRef.current.video;
    if (video.readyState !== 4) return alert("Camera not ready");

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections.length) {
      setEmotion("No Face Detected");
      return;
    }

    const expressions = detections[0].expressions;

    const maxEmotion = Object.keys(expressions).reduce((a, b) =>
      expressions[a] > expressions[b] ? a : b
    );

    const percentage = (expressions[maxEmotion] * 100).toFixed(2);
    const imageSrc = webcamRef.current.getScreenshot();

    setEmotion(maxEmotion);
    setDetectionData({
      emotion: maxEmotion,
      percentage,
      image: imageSrc,
    });
  };

  // ✅ Save Emotion Properly (ARRAY SAFE)
  const saveEmotion = () => {
    if (!detectionData) return alert("Detect emotion first");

    setPeopleData((prev) =>
      prev.map((person) => {
        if (person.name !== "Pandi") return person;

        return {
          ...person,
          week: person.week.map((day) => {
            if (day.date !== todayDate) return day;

            return {
              ...day,
              slots: {
                ...day.slots,
                [currentHour]: detectionData,
              },
            };
          }),
        };
      })
    );
  };

  // ✅ Get Current Person
  const currentPerson = peopleData.find(
    (p) => p.name === "Pandi"
  );

  const todayData = currentPerson?.week.find(
    (d) => d.date === todayDate
  );

  const savedData = todayData?.slots[currentHour];

  return (
    <div className="patientpage">

      <div className="content">
        <div className="head">
          <div className="top">
            <h1>MindTrack</h1>
          </div>
          <div className="bottom">
            <h2>Person: {currentPerson.name}</h2>

          </div>
        </div>


        <div className="datas">
          <div className="left">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            style={{
              width: "350px",
              height:"60%",

              objectFit:"cover",
              borderRadius:"30px"
            }}
          />

          <div className="btn">
            <button onClick={detectEmotion} style={{ padding: "10px 20px" }}>
            Detect Emotion
          </button>


          <button
            onClick={saveEmotion}
            disabled={!!savedData}
            style={{ padding: "10px 20px" }}
          >
            {savedData ? "Saved" : "Save Emotion"}
          </button>
          </div>

          
          <h2 style={{ color: "red" }}>{emotion}</h2>
        </div>

        <div className="right">
          {/* ✅ TABLE */}
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            textAlign: "center",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Time</th>
              <th>Status</th>
              <th>Face + Reaction</th>
            </tr>
          </thead>
          <tbody>
            {hours
              .filter((hour) => hour === currentHour) // ✅ only current hour
              .map((hour) => {
                const data = todayData?.slots[hour];

                return (
                  <tr key={hour}>
                    <td>{hour}:00 - {hour + 1}:00</td>

                    <td>{savedData ? "✅ Saved" : "🟢 Current Slot"}</td>

                    <td>
                      {data ? (
                        <div>
                          <img
                            src={data.image}
                            alt="face"
                            width="80"
                            style={{ borderRadius: "8px" }}
                          />
                          <div style={{ fontSize: "22px" }}>
                            {getEmoji(data.emotion)}
                          </div>
                          <div>
                            {data.emotion} ({data.percentage}%)
                          </div>
                        </div>
                      ) : (
                        "Not Recorded"
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;