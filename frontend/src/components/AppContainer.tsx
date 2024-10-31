import useAuth from "@/hooks/useAuth";
import Loader from "./Loader";
import { Navigate, Outlet } from "react-router-dom";

const AppContainer = () => {
  const { user, isLoading } = useAuth();
  localStorage.setItem("user", JSON.stringify(user));

  return isLoading ? (
    <Loader />
  ) : user ? (
    <section>
      {/* <UserInfo /> */}
      <Outlet />{" "}
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
