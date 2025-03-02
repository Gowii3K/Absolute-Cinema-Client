import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../UserForm";
import { LinkButton } from "../LinkButton";

const VenueSignIn = () => {
  const navigate = useNavigate();
  type FormFields = {
    email?: string;
    password?: string;
  };

  const onSubmit = async (data: FormFields) => {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email: data.email,
      password: data.password,
      type: "venue",
    });

    const token = response.data.access_token;
    console.log(token);

    const decodedToken = jwtDecode(token);
    console.log(decodedToken);

    if (decodedToken.sub) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("venueId", decodedToken.sub);
      console.log("user id has been set to "+sessionStorage.getItem("venueId"))
    }

    navigate("/venue-dash-board");
  };

  const props = {
    onSubmit: onSubmit,
    values: {
      email: true,
      password: true,
      switchTo:"/venue-sign-up",
      googleVenue:true,
      title:"SIGN IN"
    },
  };

  return (
    <>
      <UserForm {...props} />
      
    </>
  );
};

export default VenueSignIn;
