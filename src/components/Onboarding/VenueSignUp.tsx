import axios from "axios";
import {  SubmitHandler } from "react-hook-form";
import { LinkButton } from "../LinkButton";
import { UserForm } from "../UserForm";

type FormFields = {
  username?: string;
  location?: string;
  email?: string;
  password?: string;
};

export const VenueSignUp = () => {
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    const response = await axios.post(`http://localhost:3000/venues`, {
      username: data.username,
      location: data.location,
      email: data.email,
      password: data.password,
    });
    console.log(response);
  };
  const props = {
    onSubmit: onSubmit,
    values: {
      username: true,
      location: true,
      email: true,
      password: true,
    },
  };

  return (
    <>
      <UserForm {...props} />

      <LinkButton to={"/venue-sign-in"} children={"Sign In Instead"} />
    </>
  );
};

export default VenueSignUp;
