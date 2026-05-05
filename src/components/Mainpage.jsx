import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const Mainpage = () => {

  const webcamRef = useRef(null);

  const todayISO = new Date().toISOString().split("T")[0];
  const todayDisplay = new Date().toLocaleDateString();

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);
  const [loadingSlot, setLoadingSlot] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const patientname = storedUser?.patientName;
  const patientID = storedUser?._id;

  const createInitialEmotions = (name) => ({
    name: name || "",
    date: todayISO,
    morning: { Emotion: null, Percentage: null, image: null, time: null },
    afternoon: { Emotion: null, Percentage: null, image: null, time: null },
    night: { Emotion: null, Percentage: null, image: null, time: null },
  });

  const [emotions, setEmotions] = useState(
    createInitialEmotions(patientname)
  );

  // ✅ Load Models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);



  // ✅ Emotion Detection
  const detectEmotion = async () => {
    if (loadingSlot) return;

    try {
      setLoadingSlot(activeSlot);

      const video = webcamRef.current.video;

      if (!video || video.readyState !== 4) {
        alert("Camera still loading...");
        return;
      }

      const screenshot = webcamRef.current.getScreenshot();
      if (!screenshot) {
        alert("Image capture failed");
        return;
      }

      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (!detection) {
        alert("Face not detected 😕");
        return;
      }

      const expressions = detection.expressions;

      const dominantEmotion = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );

      const percentage = (
        expressions[dominantEmotion] * 100
      ).toFixed(2);

      const emotionData = {
        patientName: patientname,
        patientID: patientID,
        emotion: dominantEmotion,
        percentage: Number(percentage),
        session: activeSlot,
        date: todayISO,
        time: new Date().toLocaleTimeString()
      };

      const res = await fetch("http://localhost:7000/emotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emotionData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);   // show backend message
        return;
      }
      // ✅ Update UI only for that session
      setEmotions((prev) => ({
        ...prev,
        [activeSlot]: {
          Emotion: dominantEmotion,
          Percentage: percentage,
          image: screenshot,
          time: emotionData.time,
        },
      }));

      alert("Emotion saved successfully ✅");

      setActiveSlot(null);
      setCameraReady(false);

    } catch (err) {
      setActiveSlot(null);
      alert("❌ Emotion already saved for this session today");
    } finally {
      setLoadingSlot(null);
    }
  };

  const completedCount = ["morning", "afternoon", "night"].filter(
    (slot) => emotions[slot].Emotion !== null
  ).length;

  const isSlotActive = (slot) => {
    const hour = new Date().getHours();

    if (slot === "morning") return hour >= 8 && hour < 12;
    if (slot === "afternoon") return hour >= 12 && hour < 16;
    if (slot === "night") return hour >= 16 && hour < 23;

    return false;
  };

  const handleStart = (slot) => {
    if (loadingSlot) return;
    setActiveSlot(slot);
  };



  return (
    <div className="card">

      <div className="progress">
        <h2>Patient Emotion Check</h2>
        <h2>{patientname}</h2>
      </div>
      <h4 className="date">{todayDisplay}</h4>

      {["morning", "afternoon", "night"].map((slot) => {


        return (
          <div key={slot} className="slot">
            <h3>{slot.toUpperCase()}</h3>

            <div className="emotion-result">


              <button
                disabled={
                  !modelsLoaded ||
                  !isSlotActive(slot) ||
                  loadingSlot === slot
                }
                onClick={() => handleStart(slot)}
              >
                {loadingSlot === slot
                  ? "Scanning..."
                  : isSlotActive(slot)
                    ? "Start Scan"
                    : "Not Available Now"}
              </button>
            </div>
          </div>
        );
      })}

      {activeSlot && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h3>{activeSlot.toUpperCase()} SCAN</h3>

            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "user" }}
              onUserMedia={() => setCameraReady(true)}
              width={400}
              height={300}
            />

            <div className="modal-buttons">
              <button
                disabled={!cameraReady}
                onClick={detectEmotion}
              >
                Capture Emotion
              </button>

              <button
                onClick={() => {
                  setActiveSlot(null);
                  setCameraReady(false);
                }}
              >
                X
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Mainpage;

















