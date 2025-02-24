import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export const UserSignUp = () => {
  type UserSignUpFormFields = {
    username: string;
    password: string;
    email: string;
  };

  const { register, handleSubmit } = useForm<UserSignUpFormFields>();
  const navigate= useNavigate();

  const onSubmit = async (data: UserSignUpFormFields) => {
    const user = await axios.post("http://localhost:3000/users", {
      username: data.username,
      password: data.password,
      email: data.email,
    });

    sessionStorage.setItem('userId',user.data.userId);
    console.log(user);
    
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} type="email" placeholder="email" />
        <input
          {...register("username")}
          type="username"
          placeholder="username"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="password"
        />
        <button type="submit"> Sign Up</button>
        <Link to={"/UserSignIn"}>
          <button type="button"> Login Instead</button>
        </Link>
      </form>
    </>
  );
};
