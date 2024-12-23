import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginW from "../pages/LoginW";
import SignupW from "../pages/SignupW";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";  
import Profile from "../pages/Profile";
import Teckitmanager from "../pages/Teckitmanager";
import Checkteckit from "../pages/Checkteckit";
import { Elements } from '@stripe/react-stripe-js'; 
import { loadStripe } from '@stripe/stripe-js'; 
import BookingModal from "../pages/BookingModal";

const stripePromise = loadStripe('pk_test_51QCyiNFjwRhkW7KwJEkXQOsCQEU2GDFji43vyUInNGrJr2l6QIk0wpStec41VtJKOLZwnbyOr3Q8mB5uSLp86z9n00veLycNjH');

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
        element: <Profile />,
        errorElement: <ErrorPage />
    },
    {
        path: "/",
        element: (
          <Elements stripe={stripePromise}>
            <Home />
          </Elements>
        ), 
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
    {
        path: "/BookingModal",
        element: <BookingModal />
    },
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
