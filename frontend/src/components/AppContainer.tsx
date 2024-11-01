import useAuth from "@/hooks/useAuth";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import Loader from "./Loader";
import { Navigate, Outlet } from "react-router-dom";

const AppContainer = () => {
  const { isLoading } = useAuth();
  const { user: authStatus } = useAuthStatus();

  return isLoading ? (
    <Loader />
  ) : authStatus ? (
    <section>
      <Outlet />
    </section>
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
};

export default AppContainer;
