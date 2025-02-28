import { ButtonHTMLAttributes, FC } from "react";

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
