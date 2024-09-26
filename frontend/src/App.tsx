// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Links from "./pages/Links";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AppContainer from "./components/AppContainer";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import Preview from "./pages/Preview";
import { setNavigate } from "./lib/navigation";

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<Links />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="preview" element={<Preview />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="email/verify/:code" element={<VerifyEmail />} />
      <Route path="password/forgot" element={<ForgotPassword />} />
      <Route path="password/reset" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
