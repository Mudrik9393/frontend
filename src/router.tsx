import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthDashboard from "./pages/Auth/AuthDashboard";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthDashboard />,
        children: [
            {
                path: "/",
                element: <Navigate to="/login"/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: "signup",
                element: <Signup/>
            }
        ]
    },
])