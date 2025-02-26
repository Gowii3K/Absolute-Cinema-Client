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
  const { register, handleSubmit } = useForm<FormData>();
  const { onSubmit, values } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.userForm}>
      {values.email && (
        <input {...register("email")} type="email" placeholder="email" className={styles.formField}/>
      )}
      {values.username && (
        <input {...register("username")} type="text" placeholder="username" className={styles.formField}/>
      )}
      {values.password && (
        <input {...register("password")} type="text" placeholder="password" className={styles.formField}/>
      )}
      {values.date && (
        <input {...register("date")} type="date" placeholder="date" />
      )}
      {values.location && (
        <input {...register("location")} type="text" placeholder="location" className={styles.formField}/>
      )}
      <SubmitButton type={"submit"} children={"submit"} />
    </form>
  );
};
