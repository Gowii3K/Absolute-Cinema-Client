import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { SubmitButton } from "../SubmitButton";
import { LinkButton } from "../LinkButton";

export const UserSignIn = () => {
  const navigate = useNavigate();
  type UserSignInFormFields = {
    email: string;
    password: string;
  };

  const { register, handleSubmit } = useForm<UserSignInFormFields>();

  const onSubmit = async (data: UserSignInFormFields) => {
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
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} type="email" placeholder="email" />

        <input
          {...register("password")}
          type="password"
          placeholder="password"
        />
        <SubmitButton type={"submit"} children={"Submit"} />
        <LinkButton to={"/user-sign-up"} children={"Sign Up Instead"} />
      </form>
    </>
  );
};
