import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/Onboarding/signUp";
import SignIn from "./components/signIn";

const App = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<SignUp/>}/>
          <Route path='/signIn' element={<SignIn/>}/>
        </Routes>
    </>
  );
};

export default App;
