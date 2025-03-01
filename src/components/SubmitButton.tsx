import { ButtonHTMLAttributes, FC } from "react";
import styles from "./SubmitButton.module.css";


export const SubmitButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...rest
}) => {
  const { onClick, type, children, className } = rest;
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};
