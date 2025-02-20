import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
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
    const response = await axios.post(`http://localhost:3000/auth/login`, {
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
        <button type="submit"> Submit</button>
        <button onClick={()=>navigate('/')}> Sign up Instead</button>
      </form>
    </>
  );
};

export default SignIn;
