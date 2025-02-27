import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitButton } from "./SubmitButton";
import styles from "./UserForm.module.css";

type FormValues = {
  email?: boolean;
  username?: boolean;
  password?: boolean;
  date?: boolean;
  location?: boolean;
};

type FormData = {
  email?: string;
  username?: string;
  password?: string;
  date?: string;
  location?: string;
};
type FormProps = {
  onSubmit: SubmitHandler<FormData>;
  values: FormValues;
};

export const UserForm = (props: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { onSubmit, values } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.userForm}>
      {values.email && (
        <input
          {...register("email", { required: "email is required" })}
          type="email"
          placeholder="email"
          className={styles.formField}
        />
      )}
      {errors.email && <div>{errors.email.message}</div>}
      {values.username && (
        <input
          {...register("username", { required: "username is required" })}
          type="text"
          placeholder="username"
          className={styles.formField}
        />
      )}
      {errors.username && <div>{errors.username.message}</div>}
      {values.password && (
        <input
          {...register("password", { required: "password is required" })}
          type="password"
          placeholder="password"
          className={styles.formField}
        />
      )}
      {errors.password && <div>{errors.password.message}</div>}
      {values.date && (
        <input {...register("date")} type="date" placeholder="date" />
      )}
      {values.location && (
        <input
          {...register("location")}
          type="text"
          placeholder="location"
          className={styles.formField}
        />
      )}
      <SubmitButton type={"submit"} children={"submit"} />
    </form>
  );
};
