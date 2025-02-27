import axios from "axios";
import { useEffect } from "react";
import { LinkButton } from "../LinkButton";

export const VenueDashBoard = () => {
  let details;
  const venueId = sessionStorage.getItem("user");
  useEffect(() => {
    const getDetails = async () => {
      details = await axios.get(`http://localhost:3000/venues/${venueId}`);
      console.log(details);
    };
    getDetails();
  }, []);

  return (
    <>
      
      <LinkButton to={"/venue-screens"} children={"Find screens "} />
      <LinkButton to={"/update-address"} children={"Update Locaton"} />
    </>
  );
};
