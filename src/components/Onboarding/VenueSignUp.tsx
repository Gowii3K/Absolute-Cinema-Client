import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { SubmitButton } from "../SubmitButton";
import { LinkButton } from "../LinkButton";

type FormFields = {
  username: string;
  location: string;
  email: string;
  password: string;
};

export const VenueSignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    const response = await axios.post(`http://localhost:3000/venues`, {
      username: data.username,
      location: data.location,
      email: data.email,
      password: data.password,
    });
    console.log(response);

    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", {
            required: "username is required",
          })}
          type="text"
          name="username"
          placeholder="username"
        />
        {errors.username && <div>{errors.username.message}</div>}

        <input
          {...register("location", { required: "location is required" })}
          type="text"
          name="location"
          placeholder="location"
        />
        {errors.location && <div>{errors.location.message}</div>}

        <input
          {...register("email", {
            required: "email is required",
          })}
          type="email"
          name="email"
          placeholder="email"
        />
        {errors.email && <div>{errors.email.message}</div>}

        <input
          {...register("password", { required: "password is required" })}
          type="password"
          name="password"
          placeholder="password"
        />
        {errors.password && <div>{errors.password.message}</div>}
        <SubmitButton type={"submit"} children={"Submit"}/>
        <LinkButton to={"/venue-sign-in"} children={"Sign In Instead"} />
      </form>
    </>
  );
};

export default VenueSignUp;
