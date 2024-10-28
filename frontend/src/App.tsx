// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppContainer />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: (
            <Layout>
              <Outlet />
            </Layout>
          ),
          children: [
            {
              index: true,
              element: <Links />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "signup",
      element: <Signup />,
      errorElement: <ErrorPage />,
    },
    {
      path: "email/verify/:code",
      element: <VerifyEmail />,
      errorElement: <ErrorPage />,
    },
    {
      path: "password/forgot",
      element: <ForgotPassword />,
      errorElement: <ErrorPage />,
    },
    {
      path: "password/reset",
      element: <ResetPassword />,
      errorElement: <ErrorPage />,
    },
    {
      path: "link/:id",
      element: <Preview />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
