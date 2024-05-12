import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoutes = ({ element }) => {
  const isAuthenticated = localStorage.getItem("userData");

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoutes;
