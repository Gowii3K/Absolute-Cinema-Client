import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { LinkButton } from "../LinkButton";
import { UserForm } from "../UserForm";

export const UserSignIn = () => {
  const navigate = useNavigate();

  type UserSignInFormFields = {
    email?: string;
    password?: string;
  };

  const onSubmit = async (data: UserSignInFormFields) => {
    console.log(data);
    const response = await axios.post("http://localhost:3000/auth/login", {
      email: data.email,
      password: data.password,
      type: "user",
    });

    const decodedUser = jwtDecode(response.data.access_token);
    console.log(decodedUser);
    if (decodedUser.sub) {
      sessionStorage.setItem("userId", decodedUser.sub);
    }

    navigate("/user-home-page");
  };

  const props = {
    onSubmit: onSubmit,
    values: {
      email: true,
      password: true,
      switchTo:"/user-sign-up"
    },
  };
  return (
    <>
      <UserForm {...props} />
    </>
  );
};
