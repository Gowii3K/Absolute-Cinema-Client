import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LinkButton } from "../LinkButton";
import { SubmitButton } from "../SubmitButton";

const VenueSignIn = () => {
  const navigate = useNavigate();
  type FormFields = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

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

    reset();
    navigate("/venue-screens");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { required: "email is required" })}
          type="email"
          name="email"
        />
        <div>{errors.email && errors.email.message}</div>
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          name="password"
        />
        <div>{errors.password && errors.password.message}</div>
        <SubmitButton type={"submit"} children={"Submit"}/>
        <LinkButton to={"/venue-sign-up"} children={'Sign Up Instead'} />
      </form>
    </>
  );
};

export default VenueSignIn;
