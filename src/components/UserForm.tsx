import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitButton } from "./SubmitButton";
import styles from "./UserForm.module.css";
import { LinkButton } from "./LinkButton";
import axios from "axios";

type FormValues = {
  email?: boolean;
  username?: boolean;
  password?: boolean;
  date?: boolean;
  location?: boolean;
  switchTo?: string;
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

const google = async () => {
  window.location.href = "http://localhost:3000/auth";
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
      <img src="src\assets\pngegg.png" className={styles.logo} />
      {values.email && (
        <input
          {...register("email", { required: "email is required" })}
          type="email"
          placeholder="Email"
          className={styles.formField}
        />
      )}
      <div className={styles.errorContainer}>
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}
      </div>
      {values.username && (
        <input
          {...register("username", { required: "username is required" })}
          type="text"
          placeholder="Username"
          className={styles.formField}
        />
      )}
      <div className={styles.errorContainer}>
        {errors.username && (
          <p className={styles.errorMessage}>{errors.username.message}</p>
        )}
      </div>
      {values.password && (
        <input
          {...register("password", { required: "password is required" })}
          type="password"
          placeholder="Password"
          className={styles.formField}
        />
      )}
      <div className={styles.errorContainer}>
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password.message}</p>
        )}
      </div>
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
      <SubmitButton
        type={"submit"}
        children={"Submit"}
        className={styles.userFormButton}
      />
      <button type="button" onClick={google}>
        Google Time
      </button>
      {values.switchTo && (
        <LinkButton
          to={values.switchTo}
          children={"Sign In Instead"}
          className={styles.userFormButton}
        />
      )}
    </form>
  );
};
