import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast"; 
import { WelcomePage } from "./pages/WelcomePage";
import { FormPage } from "./pages/FormPage"; 
import { SuccessPage } from "./pages/SuccessPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  );
};

export default App;
