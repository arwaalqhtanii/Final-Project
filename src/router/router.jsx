import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Checkteckit from "../pages/Checkteckit";
import Teckitmanager from "../pages/Teckitmanager";
const router = createBrowserRouter([


    {
        path: "/teckitmanager",
        element: <Teckitmanager></Teckitmanager>
    },
    {
        path: "/checkteckit",
        element: <Checkteckit></Checkteckit>
    }
    
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;