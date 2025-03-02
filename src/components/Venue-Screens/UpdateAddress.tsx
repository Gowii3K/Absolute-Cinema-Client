import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { SubmitButton } from "../SubmitButton";
import styles from "./UpdateAddress.module.css";

export const UpdateAddress = () => {
  const [details, setDetails] = useState<venue | null>(null);
  const [isAddress, setIsAddress] = useState(false);

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

  const venueId = sessionStorage.getItem("venueId");
  const locationRef = useRef<google.maps.places.SearchBox>(null);
  const onLoad = (ref: google.maps.places.SearchBox) => {
    locationRef.current = ref;
  };
  const onPlacesChanged = () => {
    if (locationRef.current) {
      const places = locationRef.current.getPlaces();
      if (places) {
        console.log(places);
        console.log(places[0].formatted_address);
        console.log(places[0].geometry?.location?.lat());
      }
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      console.log("venue id is " + venueId);
      const details = await axios.get(
        `http://localhost:3000/venues/${venueId}`
      );
      setDetails(details.data);
    };
    getDetails();
  }, []);

  useEffect(() => {
    console.log(details);
    
    if (details?.location)  {
      setIsAddress(true);
      console.log("location is" + details?.location);
    }
  }, [details]);

  const update = async () => {
    if (locationRef.current) {
      const updateLocation = locationRef.current.getPlaces();
      console.log(updateLocation);
      if (updateLocation) {
        console.log({
          location: updateLocation[0].formatted_address,
          lat: updateLocation[0].geometry?.location?.lat(),
          lng: updateLocation[0].geometry?.location?.lng(),
        });
        console.log("called");
        
        await axios.put(`http://localhost:3000/venues/address/${venueId}`, {
          location: updateLocation[0].formatted_address,
          lat: updateLocation[0].geometry?.location?.lat(),
          lng: updateLocation[0].geometry?.location?.lng(),
        });
        
      }
    }
  };

  return (
    <div className={styles.addressContainer}>
      <div className={styles.details}>
        {isAddress && <h1>Your current Address is {details?.location}</h1>}
        {!isAddress && <h1>You have not set a location yet</h1>}
      </div>
      <div className={styles.inputContainer}>
        <LoadScript
          libraries={["places"]}
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        >
          <StandaloneSearchBox
            onPlacesChanged={onPlacesChanged}
            onLoad={onLoad}
          >
            <input
              type="text"
              placeholder="Search for a place"
              className={styles.formField}
            />
          </StandaloneSearchBox>
        </LoadScript>
      </div>
      <div>
        <SubmitButton type="button" onClick={update} children={"Submit"} />
      </div>
    </div>
  );
};
