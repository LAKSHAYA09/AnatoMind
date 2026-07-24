import React from "react";
import ReactDOM from "react-dom/client";
import { useGLTF } from "@react-three/drei";
import App from "./App";
import "./index.css";

/* Start loading the 3D heart immediately */
useGLTF.preload("/models/heart.glb");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);