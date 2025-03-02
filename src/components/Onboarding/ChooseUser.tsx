import styles from "./ChoseUser.module.css";
import "../../App.css";
import { LinkButton } from "../LinkButton";

export const ChooseUser = () => {
  console.log(import.meta.env.VITE_GOOGLE_API_KEY);

  return (
    <div className={styles["option-container"]}>
      <img src="src\assets\video-camera (1).png" />
      <h1 className={styles.heading}>Welcome To Absolute Cinema</h1>
      <h2 className={styles.heading}>Are you a</h2>
      <LinkButton
        to={"/user-sign-up"}
        className={styles.formButton}
        children={"USERS"}
      />

      <LinkButton
        to={"/venue-sign-up"}
        className={styles.formButton}
        children={"ADMINSS"}
      />
    </div>
  );
};
