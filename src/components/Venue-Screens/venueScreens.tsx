import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SubmitButton } from "../SubmitButton";

const VenueScreens = () => {
  type FormFields = {
    seats: number;
  };
  const [screensArr, setScreensArr] = useState<
    { screenId: number; venueId: number; seats: number }[]
  >([]);

  const [overlay, setOverlay] = useState(false);

  const { register, handleSubmit } = useForm<FormFields>();

  useEffect(() => {
    const getScreens = async () => {
      const id = sessionStorage.getItem("user");
      console.log(id);

      const screens = await axios.get(`http://localhost:3000/screens/${id}`);
      await setScreensArr(screens.data);
      console.log(screens.data);
    };

    getScreens();
  }, []);

  const showUi = () => {
    setOverlay(!overlay);
  };

  const onSubmit = async (data: FormFields) => {
    const id = sessionStorage.getItem("user");
    console.log(id);

    const screen = await axios.post(`http://localhost:3000/screens/`, {
      venueId: Number(id),
      seats: Number(data.seats),
    });

    setScreensArr((prev) => [...prev, screen.data]);
    setOverlay(!overlay);
  };

  const deleteScreen = async (screenId: number) => {
    console.log(screenId);
    const deletedScreen = await axios.delete(
      `http://localhost:3000/screens/${screenId}`
    );

    setScreensArr((prev) =>
      prev.filter((screen) => screen.screenId !== screenId)
    );
  };

  return (
    <>
      <div>
        {screensArr.map((screen) => (
          <div key={screen.screenId}>
            <Link to={`/screen-details/${screen.screenId}`}>
              <h1>{screen.screenId}</h1>
            </Link>
            <h2>{screen.seats}</h2>
            <h3>{screen.venueId}</h3>
            <SubmitButton
              type={"button"}
              onClick={() => deleteScreen(screen.screenId)}
              children={"Delete Screen"}
            />
          </div>
        ))}
      </div>
      <div>
        <SubmitButton
          type={"button"}
          onClick={showUi}
          children={"Add screenzzzzz"}
        />
        {overlay && (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("seats")}
                type="number"
                placeholder="number of seats"
              />
              <SubmitButton type={"submit"} children={"Add it"} />
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default VenueScreens;
