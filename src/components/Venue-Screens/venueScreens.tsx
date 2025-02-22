import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VenueScreens = () => {
  const [screensArr, setScreensArr] = useState<
    { screenId: number; venueId: number; seats: number }[]
  >([]);

  useEffect(() => {
    const getScreens = async () => {
      const id = sessionStorage.getItem("user");
      console.log(id);

      const screens = await axios.get(`http://localhost:3000/screens/${id}`);
      setScreensArr(screens.data);
      console.log(screens.data);
    };

    getScreens();
  },[]);

  return (
    <>
      <div>
        {screensArr.map((screen) => (
          <div key={screen.screenId}>
            <Link to={`/screenDetails/${screen.screenId}`}>
              <h1>{screen.screenId}</h1>
            </Link>
            <h2>{screen.seats}</h2>
            <h3>{screen.venueId}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default VenueScreens;
