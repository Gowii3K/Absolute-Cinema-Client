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
      sessionStorage.setItem("user", decodedToken.sub);
    }

    navigate("/venue-screens");
  };

  const props = {
    onSubmit: onSubmit,
    values: {
      email: true,
      password: true,
    },
  };

  return (
    <>
      <UserForm {...props} />
      <LinkButton
        to={"/venue-sign-up"}
        children={"Sign Up Instead"}
      ></LinkButton>
    </>
  );
};

export default VenueSignIn;
