import { ButtonHTMLAttributes, FC } from "react";

export const SubmitButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...rest
}) => {
  const { onClick, type, children } = rest;
  return (

    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};
