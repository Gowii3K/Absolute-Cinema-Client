import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Onboarding/signUp";
import SignIn from "./components/Onboarding/signIn";
import VenueScreens from "./components/Venue-Screens/venueScreens";
import { ScreenDetails } from "./components/Venue-Screens/screenDetails";
import ShowBookings from "./components/Venue-Screens/showBookings";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/VenueScreens" element={<VenueScreens />} />
        <Route path="/ScreenDetails/:screenId" element={<ScreenDetails />} />
        <Route path="/ShowBookings/:showId" element={<ShowBookings/>} />
      </Routes>
    </>
  );
};

export default App;
