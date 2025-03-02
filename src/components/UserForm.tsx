import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitButton } from "./SubmitButton";
import styles from "./UserForm.module.css";
import { LinkButton } from "./LinkButton";

type FormValues = {
  email?: boolean;
  username?: boolean;
  password?: boolean;
  location?: boolean;
  switchTo?: string;
  googleVenue: boolean;
  title: string;
};

type FormData = {
  email?: string;
  username?: string;
  password?: string;
  location?: string;
};
type FormProps = {
  onSubmit: SubmitHandler<FormData>;
  values: FormValues;
};

const google = async () => {
  window.location.href = "http://localhost:3000/auth";
};

const googleVenue = async () => {
  window.location.href = "http://localhost:3000/auth/venue";
};

export const UserForm = (props: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { onSubmit, values } = props;

  const buttonText =
    values.title === "SIGN UP" ? "Sign In Instead" : "Sign Up Instead";

  return (
    <div className={styles.formContainer}>
      <div className={styles.logoContainer}>
        <img src="src\assets\video-camera (1).png" className={styles.logo} />
        <h1>Absolute Cinema</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.userForm}>
        <h2>{values.title}</h2>
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
        <SubmitButton
          type={"submit"}
          children={"Submit"}
          className={styles.formButton}
        />

        {!values.googleVenue && (
          <button type="button" onClick={google} className={styles.formButton}>
            Continue with Google
          </button>
        )}
        {values.googleVenue && (
          <button type="button" onClick={googleVenue} className={styles.formButton}>
            Continue with Google to Venue
          </button>
        )}

        {values.switchTo && (
          <LinkButton to={values.switchTo} children={buttonText} />
        )}
      </form>
    </div>
  );
};
