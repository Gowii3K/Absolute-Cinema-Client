import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { LinkButton } from "../LinkButton";
import { UserForm } from "../UserForm";

export const UserSignUp = () => {
  type UserSignUpFormFields = {
    username?: string;
    password?: string;
    email?: string;
  };



  const navigate = useNavigate();

  const onSubmit = async (data: UserSignUpFormFields) => {
    const user = await axios.post("http://localhost:3000/users", {
      username: data.username,
      password: data.password,
      email: data.email,
    });

    sessionStorage.setItem("userId", user.data.userId);
    console.log(user);
  };

  const props={
    onSubmit:onSubmit,
    values:{
      username:true,
      password:true,
      email:true,
      switchTo:"/user-sign-in"
    }
  }

  return (
    <>
      
      <UserForm {...props}/>
        
    </>
  );
};
