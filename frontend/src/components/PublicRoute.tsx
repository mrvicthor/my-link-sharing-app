import { Navigate } from "react-router-dom";
import React from "react";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const user = JSON.parse(localStorage.getItem("user") as string);
  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default PublicRoute;
