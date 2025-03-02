import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";


export const LinkButton: FC<LinkProps> = ({ to, children ,className}) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};
