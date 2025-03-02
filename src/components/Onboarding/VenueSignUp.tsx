import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import { LinkButton } from "../LinkButton";
import { UserForm } from "../UserForm";

type FormFields = {
  username?: string;
  email?: string;
  password?: string;
  
};

export const VenueSignUp = () => {
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    const response = await axios.post(`http://localhost:3000/venues`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });
    console.log(response);
  };
  const props = {
    onSubmit: onSubmit,
    values: {
      username: true,
      email: true,
      password: true,
      switchTo: "/venue-sign-in",
      googleVenue:true,
      title:"SIGN UP"
    },
  };

  return (
    <>
      <UserForm {...props} />
    </>
  );
};

export default VenueSignUp;
