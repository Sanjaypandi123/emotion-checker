// import React, { useEffect, useRef, useState } from "react";
// import './App.css'
// import Mainpage from "./components/Mainpage";

// import Webcam from "react-webcam";
// import * as faceapi from "face-api.js";


// function App() {

//   const hours = Array.from({ length: 11 }, (_, i) => i + 8);

//   const today = new Date().toLocaleDateString("en-IN", {
//     timeZone: "Asia/Kolkata"
//   });



//   const webcamRef = useRef(null);
//   const [emotion, setEmotion] = useState("Loading Models...");

//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = "/models";

//       await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//       await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

//       startDetection();
//     };

//     loadModels();
//   }, []);

//   const startDetection = () => {
//     setInterval(async () => {
//       if (
//         webcamRef.current &&
//         webcamRef.current.video.readyState === 4
//       ) {
//         const video = webcamRef.current.video;

//         const detections = await faceapi
//           .detectAllFaces(
//             video,
//             new faceapi.TinyFaceDetectorOptions()
//           )
//           .withFaceExpressions();

//         if (detections.length > 0) {
//           const expressions = detections[0].expressions;

//           const maxEmotion = Object.keys(expressions).reduce((a, b) =>
//             expressions[a] > expressions[b] ? a : b
//           );

//           setEmotion(maxEmotion);
//         } else {
//           setEmotion("No Face Detected");
//         }
//       }
//     }, 1000);
//   }








//   return (
//     <>

//       <div className="container">
//         <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th>Slot</th>
//               <th>Time (IST)</th>
//               <th>Emotions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {hours.map((hour, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>
//                   {hour.toString().padStart(2, "0")}:00 -{" "}
//                   {(hour + 1).toString().padStart(2, "0")}:00 IST
//                 </td>
//                 <td><Mainpage /></td>
//                 <td>
//                   <div style={{ textAlign: "center", marginTop: "20px" }}>
//                     <h1>🎭 Face Emotion Tracker</h1>

//                     <Webcam
//                       ref={webcamRef}
//                       audio={false}
//                       width={400}
//                       height={300}
//                     />

//                     <h2>Detected Emotion:</h2>
//                     <h1 style={{ color: "red" }}>{emotion}</h1>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default App

import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import Mainpage from './components/Mainpage.jsx'



function App() {
  

  return (
    
    <>

    <div className="allcontainer">

    <Mainpage/>
    </div>
    

    </>
  )
}

export default App;