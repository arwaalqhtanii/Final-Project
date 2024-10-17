import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Admin from "../pages/Admin";

const router = createBrowserRouter([

    {
        path: "/admin",
        element: <Admin></Admin>
    }
    
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;