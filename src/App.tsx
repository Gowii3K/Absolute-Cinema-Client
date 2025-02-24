import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Onboarding/VenueSignUp";
import SignIn from "./components/Onboarding/VenueSignIn";
import VenueScreens from "./components/Venue-Screens/VenueScreens";
import { ScreenDetails } from "./components/Venue-Screens/ScreenDetails";
import ShowBookings from "./components/Venue-Screens/ShowBookings";
import { UserSignIn } from "./components/Onboarding/UserSignIn";
import { UserSignUp } from "./components/Onboarding/UserSignUp";
import { ChooseUser } from "./components/Onboarding/ChooseUser";
import { UserHomePage } from "./components/User/UserHomePage";
import { UserShowBooking } from "./components/User/UserShowBooking";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChooseUser />} />
        <Route path="/UserSignUp" element={<UserSignUp />} />
        <Route path="/UserHomePage" element={<UserHomePage />} />
        <Route path="/UserShowBooking/:showId" element={<UserShowBooking />} />

        <Route path="/UserSignIn" element={<UserSignIn />} />
        <Route path="/VenueSignUp" element={<SignUp />} />

        <Route path="/VenueSignIn" element={<SignIn />} />
        <Route path="/VenueScreens" element={<VenueScreens />} />
        <Route path="/ScreenDetails/:screenId" element={<ScreenDetails />} />
        <Route path="/ShowBookings/:showId" element={<ShowBookings />} />
      </Routes>
    </>
  );
};

export default App;
