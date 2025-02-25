import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChooseUser } from "./components/Onboarding/ChooseUser";
import { UserSignUp } from "./components/Onboarding/UserSignUp";
import { UserSignIn } from "./components/Onboarding/UserSignIn";
import VenueSignUp from "./components/Onboarding/VenueSignUp";
import VenueSignIn from "./components/Onboarding/VenueSignIn";
import VenueScreens from "./components/Venue-Screens/VenueScreens";
import { ScreenDetails } from "./components/Venue-Screens/ScreenDetails";
import ShowBookings from "./components/Venue-Screens/ShowBookings";
import { UserHomePage } from "./components/User/UserHomePage";
import { UserShowBooking } from "./components/User/UserShowBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ChooseUser />,
  },
  {
    path: "/user-sign-up",
    element: <UserSignUp />,
  },
  {
    path: "/user-sign-in",
    element: <UserSignIn />,
  },
  {
    path: "/venue-sign-up",
    element: <VenueSignUp />,
  },
  {
    path: "/venue-sign-in",
    element: <VenueSignIn />,
  },
  {
    path: "/venue-screens",
    element: <VenueScreens />,
  },
  {
    path: "/screen-details/:screenId",
    element: <ScreenDetails />,
  },
  {
    path: "/show-bookings/:showId",
    element: <ShowBookings />,
  },
  {
    path: "/user-home-page",
    element: <UserHomePage />,
  },
  {
    path: "/user-show-booking/:showId",
    element: <UserShowBooking />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
