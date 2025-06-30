import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthDashboard from "./pages/Auth/AuthDashboard";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Main from "./components/layout/Main";
import Dashboard from "./pages/Dashboard";
import User from "./pages/user/User";
import Complaint from "./pages/user/Complaint";
import Request from "./pages/user/Request";
import Calculation from "./pages/user/Calculation";
import ChangePassword from "./pages/user/ChangePassword";
import Report from "./pages/user/Report";
import MeterReaderBills from "./pages/user/MeterReaderBills";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthDashboard />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
     
    ],
  },
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/user", element: <User /> },
      { path: "/complaint", element: <Complaint /> },
      { path: "/request", element: <Request /> },
      { path: "/calculation", element: <Calculation /> },
      { path: "/meterreaderbills", element: <MeterReaderBills /> },
      {path:"/change-password", element: <ChangePassword />},
      { path: "/report", element: <Report /> },
    ],
  },
]);
