import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import initCornerstone from "./initCornerstone.js";
import ViewerTry from "./Atest.jsx";
import Viewer from "./StackViewer.jsx";
import VolumeViewer from "./VolumeViewer.jsx";
import DicomVolumeViewer from "./DicomVolumeViewer.jsx";

initCornerstone();
ReactDOM.createRoot(document.getElementById("root")).render(<VolumeViewer />);
