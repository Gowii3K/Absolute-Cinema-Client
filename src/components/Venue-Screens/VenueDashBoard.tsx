import axios from "axios";
import { useEffect, useState } from "react";
import { LinkButton } from "../LinkButton";
import styles from "./VenueDashBoard.module.css";
import { jwtDecode } from "jwt-decode";

export const VenueDashBoard = () => {
  const [details, setDetails] = useState<venue | null>(null);
  const [venueId, setVenueId] = useState<string | null>(
    sessionStorage.getItem("venueId")
  );

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
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    console.log(token);
    if (token) {
      const decodedUser = jwtDecode(token);
      console.log(decodedUser);
      if (decodedUser.sub) {
        console.log(decodedUser.sub);
        sessionStorage.setItem("token", token);

        sessionStorage.setItem("venueId", decodedUser.sub);
        setVenueId(sessionStorage.getItem("venueId"));
        console.log("venue id set in session storage as" + venueId);
      }
    }
  }, []);

  useEffect(() => {
    console.log(details);
    const getDetails = async () => {
      const response = await axios.get(
        `http://localhost:3000/venues/${venueId}`
      );
      setDetails(response.data);
    };
    getDetails();
    console.log(details);
  }, [venueId]);

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
        <LinkButton
          to={"/venue-screens"}
          children={"My screens"}
          className={styles.formButton}
        />
        <LinkButton
          to={"/update-address"}
          children={"Update Location"}
          className={styles.formButton}
        />
      </div>
    </div>
  );
};
