import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthDashboard from "./pages/Auth/AuthDashboard";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Main from "./components/layout/Main";
import Dashboard from "./pages/Dashboard";
import User from "./pages/user/User";


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
    {
        path: '/',
        element: <Main/>,
        children : [
            {path: "/", element : <Navigate to="/dashboard"/>},
            {path: '/dashboard',element: <Dashboard/>},
            {path: '/user', element: <User/>}
        ]
    }
])