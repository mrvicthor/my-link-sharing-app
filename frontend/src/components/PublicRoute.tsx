import { Navigate } from "react-router-dom";
import React from "react";
import { useAuthStatus } from "@/hooks/useAuthStatus";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStatus();

  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default PublicRoute;
