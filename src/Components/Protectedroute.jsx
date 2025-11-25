
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <div className="spinner-border" role="status" aria-hidden="true"></div>
        <div className="mt-2">Checking authentication…</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // send the user to /login, remembering where they came from
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
