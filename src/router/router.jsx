import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "../../FrontEnd/src/pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/Home" replace /> // Redirect root to /Home
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
