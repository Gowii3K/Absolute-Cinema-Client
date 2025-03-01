import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";
import styles from "./LinkButton.module.css";


export const LinkButton: FC<LinkProps> = ({ to, children }) => {
  return (
    <Link to={to} className={styles.userFormButton}>
      {children}
    </Link>
  );
};
