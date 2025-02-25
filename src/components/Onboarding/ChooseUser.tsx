import { Link } from "react-router-dom";
import styles from "./ChoseUser.module.css";
import "../../App.css";
import { LinkButton } from "../LinkButton";

export const ChooseUser = () => {
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
