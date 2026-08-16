import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero.jsx";
import Login from "./pages/login.jsx";
import PatientDetails from "./pages/PatientDetails.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient-details" element={<PatientDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}