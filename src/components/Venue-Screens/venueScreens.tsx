import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SubmitButton } from "../SubmitButton";
import styles from "./VenueScreens.module.css";

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
      const id = sessionStorage.getItem("venueId");
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
    const id = sessionStorage.getItem("venueId");
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
      <div className={styles.screensContainer}>
        <h1 className={styles.title}>My Screens</h1>
        {screensArr.map((screen) => (
          <div key={screen.screenId} className={styles.screenCard}>
            <Link
              to={`/screen-details/${screen.screenId}`}
              className={styles.screenLink}
            >
              <h1> Screen {screen.screenId}</h1>
            </Link>
            <h2>No of Seats:{screen.seats}</h2>
            <SubmitButton
              type={"button"}
              onClick={() => deleteScreen(screen.screenId)}
              children={"Delete Screen"}
              className={styles.screenButton}
            />
          </div>
        ))}
        <div className={styles.submit}>
          <SubmitButton
            type={"button"}
            onClick={showUi}
            children={"Add screenzzzzz"}
            className={styles.screenButton}
          />
          {overlay && (
            <div className={styles.addScreen}>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.addScreenForm}>
                <input
                  {...register("seats")}
                  type="number"
                  placeholder="number of seats"
                  className={styles.formField}
                />
                <SubmitButton
                  type={"submit"}
                  children={"Add it"}
                  className={styles.screenButton}
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VenueScreens;
