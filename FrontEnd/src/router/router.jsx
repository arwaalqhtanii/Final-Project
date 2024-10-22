
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import LoginW from "../pages/LoginW";
import SignupW from "../pages/SignupW";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";  
import Profile from "../pages/Profile";
import Teckitmanager from "../pages/Teckitmanager";
import Checkteckit from "../pages/Checkteckit";

const router = createBrowserRouter([

    {
        path: "/LoginW",
        element: <LoginW />,
        errorElement: <ErrorPage />
    },
    {
        path: "/SignupW",
        element: <SignupW />,
  
        errorElement: <ErrorPage />
    },
    {
        path: "/Profile",
        element: <Profile/>,
  
        errorElement: <ErrorPage />
    },
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: "*",  
        element: <ErrorPage />
    },
    {
        path: "/Teckitmanager",  
        element: <Teckitmanager />
    },
    {
        path: "/Checkteckit",  
        element: <Checkteckit />
    },
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
