import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CoinChart from "./pages/CoinChart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./protect/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coin/:coinId"
          element={
            <ProtectedRoute>
              <CoinChart />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
};

export default App;
