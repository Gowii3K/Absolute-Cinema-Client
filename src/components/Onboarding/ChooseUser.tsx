import { Link } from "react-router-dom";

export const ChooseUser = () => {
  return (
    <>
      <Link to={"/VenueSignUp"}>
        <button type="button">Admin</button>
      </Link>
      <Link to={"/UserSignUp"}>
        <button type="button">User</button>
      </Link>
    </>
  );
};
