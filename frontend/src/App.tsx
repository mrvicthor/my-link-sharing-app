// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Outlet, Routes, Route, useNavigate } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import ErrorPage from "./pages/ErrorPage";
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
      {/* Public Preview Routes */}
      <Route path="link/:id" element={<Preview />} />
      {/* Public Auth Routes */}
      <Route
        path="login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="password/forgot"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="password/reset"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      {/* Public Verified Auth Routes */}
      <Route path="email/verify/:code" element={<VerifyEmail />} />

      {/* Protected App Route */}
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
      </Route>

      <Route path="*" errorElement={<ErrorPage />} />
    </Routes>
  );
}

export default App;
