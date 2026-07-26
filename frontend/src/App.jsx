import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";

function DashboardPlaceholder() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020202] text-white">
      <h1 className="text-3xl font-semibold">
        AnatoMind Dashboard Coming Soon 🫀
      </h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPlaceholder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;