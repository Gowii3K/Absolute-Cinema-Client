import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { SubmitButton } from "../SubmitButton";

export const UpdateAddress = () => {
  const venueId = sessionStorage.getItem("user");
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
      const details = await axios.get(
        `http://localhost:3000/venues/${venueId}`
      );
      console.log(details);
    };
    getDetails();
  }, []);

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
    <>
      <LoadScript
        libraries={["places"]}
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      >
        <StandaloneSearchBox onPlacesChanged={onPlacesChanged} onLoad={onLoad}>
          <input
            type="text"
            placeholder="Search for a place"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </StandaloneSearchBox>
      </LoadScript>
      <SubmitButton type="button" onClick={update} children={"Submit"} />
    </>
  );
};
