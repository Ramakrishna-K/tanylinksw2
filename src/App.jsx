import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
// import Stats from "./pages/Stats";
import RedirectPage from "./pages/Redirect";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="/code/:code" element={<Stats />} /> */}
      <Route path="/:code" element={<RedirectPage />} />
    </Routes>
  );
}

export default App;
