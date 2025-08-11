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
import PrivateRoute from "./pages/Auth/PrivateRoute"; // ✅ added
import AggregateReport from "./pages/user/AggregateReport";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthDashboard />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/user",
        element: (
          <PrivateRoute>
            <User />
          </PrivateRoute>
        ),
      },
      {
        path: "/complaint",
        element: (
          <PrivateRoute>
            <Complaint />
          </PrivateRoute>
        ),
      },
      {
        path: "/request",
        element: (
          <PrivateRoute>
            <Request />
          </PrivateRoute>
        ),
      },
      {
        path: "/calculation",
        element: (
          <PrivateRoute>
            <Calculation />
          </PrivateRoute>
        ),
      },
      {
        path: "/meterreaderbills",
        element: (
          <PrivateRoute>
            <MeterReaderBills />
          </PrivateRoute>
        ),
      },
      {
        path: "/aggregate",
        element: (
          <PrivateRoute>
            <AggregateReport />
          </PrivateRoute>
        ),
      },
      {
        path: "/report",
        element: (
          <PrivateRoute>
            <Report />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
