
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Admin from "../pages/Admin";
import LoginW from "../pages/LoginW";
import SignupW from "../pages/SignupW";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Admin></Admin>
    },
    {
        path: "/LoginW",
        element: <LoginW/>
    },
    {
        path: "/SignupW",
        element: <SignupW/>
        // element: <Navigate to="/Home" replace /> 
    },
    {
        path: "/Home",
        element: <Home/>
    },
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
