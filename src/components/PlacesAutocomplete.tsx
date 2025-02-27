import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

export const PlacesAutocomplete = () => {
  const [location, setLocation] = useState("");
  const locationRef = useRef<google.maps.places.SearchBox>(null);

  const onLoad = (ref: google.maps.places.SearchBox) => {
    locationRef.current = ref;
  };

  const onPlacesChanged = () => {
    if (locationRef.current) {
      const places = locationRef.current.getPlaces();
      if(places){
        console.log(places);
        console.log(places[0].formatted_address);
      }
    }
  };

  return (
    <LoadScript
      libraries={["places"]}
      googleMapsApiKey="AIzaSyApPLpD4Jc7HwupzUtLAMbcmHgpdo8jbgE"
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
  );
};
