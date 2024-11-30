import { Navigate } from "react-router-dom";
import React from "react";
// import { useAuthStatus } from "@/hooks/useAuthStatus";
import useAuth from "@/hooks/useAuth";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  // const { user } = useAuthStatus();
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default PublicRoute;
