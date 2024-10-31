import { Navigate } from "react-router-dom";
import React from "react";
import useAuth from "@/hooks/useAuth";
import Loader from "./Loader";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader />;
  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default PublicRoute;
