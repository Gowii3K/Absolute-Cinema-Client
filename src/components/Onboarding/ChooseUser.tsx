import styles from "./ChoseUser.module.css";
import "../../App.css";
import { LinkButton } from "../LinkButton";
import { PlacesAutocomplete } from "../PlacesAutocomplete";

export const ChooseUser = () => {
  console.log(import.meta.env.VITE_GOOGLE_API_KEY);


  return (
    <div className={styles["option-container"]}>
      <LinkButton
        to={"/user-sign-up"}
        className={styles["link-button"]}
        children={"USERS"}
      />

      <LinkButton
        to={"/venue-sign-up"}
        className={styles["link-button"]}
        children={"ADMINSS"}
      />
    </div>
  );
};
