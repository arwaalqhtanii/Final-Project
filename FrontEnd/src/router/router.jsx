
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Admin from "../pages/Admin";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Admin></Admin>
    },
    {
        path: "/Register",
        element: <Register/>
    },
    {
        path: "/Login",
        element: <Login/>
        // element: <Navigate to="/Home" replace /> 
    },
    {
        path: "/Home",
        element: <Home/>
    }
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
