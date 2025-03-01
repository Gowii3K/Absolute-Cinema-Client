import axios from "axios";
import { useEffect, useState } from "react";
import { LinkButton } from "../LinkButton";
import styles from "./VenueDashBoard.module.css";

export const VenueDashBoard = () => {
  const [details, setDetails] = useState<venue | null>(null);
  const venueId = sessionStorage.getItem("user");

  interface venue {
    venueId: number;
    createdAt: string;
    email: string;
    lat: number;
    lng: number;
    location: string;
    password: string;
    username: string;
  }

  useEffect(() => {
    const getDetails = async () => {
      const response = await axios.get(
        `http://localhost:3000/venues/${venueId}`
      );
      setDetails(response.data);
    };
    getDetails();
    console.log(details);
  }, []);

  useEffect(() => {
    console.log(details);
  }, [details]);

  return (
    <div className={styles.detailsContainer}>
      {details && (
        <>
          <h1>{details.venueId}</h1>
          <h1>{details.username}</h1>
          <h2>{details.location}</h2>
        </>
      )}
      <div className={styles.optionsContainer}>
        <LinkButton to={"/venue-screens"} children={"Find screens"} />
        <LinkButton to={"/update-address"} children={"Update Locaton"} />
      </div>
    </div>
  );
};
