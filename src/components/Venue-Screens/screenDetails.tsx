import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { SubmitButton } from "../SubmitButton";
import { LinkButton } from "../LinkButton";
import { DateSelector } from "../DateSelector";
import styles from "./ScreenDetails.module.css";

export const ScreenDetails = () => {
  type FormFields = {
    date?: string;
  };

  type ShowFormFields = {
    time: string;
  };
  const { screenId } = useParams();
  const [showsArr, setShowsArr] = useState<
    { showId: number; screenId: number; date: string; time: string }[]
  >([]);
  const [overlay, setOverlay] = useState(false);

  const [date, setDate] = useState("");

  const { register: registerShow, handleSubmit: submitShow } =
    useForm<ShowFormFields>();

  const onSubmit = async (data: FormFields) => {
    const shows = await axios.get(
      `http://localhost:3000/shows/${screenId}/${data.date}`
    );
    setShowsArr(shows.data);
    if (data.date) {
      setDate(data.date);
      setOverlay(false);
    }
  };

  const onSubmitShow = async (data: ShowFormFields) => {
    console.log(data);

    const addedShow = await axios.post(`http://localhost:3000/shows`, {
      screenId: Number(screenId),
      date: date,
      time: data.time,
    });

    setShowsArr((prev) => [...prev, addedShow.data]);

    console.log(addedShow);
  };

  const showOverlay = () => {
    setOverlay(!overlay);
  };

  const deleteShow = async (showId: number) => {
    console.log(showId);

    const deletedShow = await axios.delete(
      `http://localhost:3000/shows/${showId}`
    );

    setShowsArr((prev) => prev.filter((show) => show.showId !== showId));
  };
  const props = {
    onSubmit: onSubmit,
    values: {
      date: true,
    },
  };

  return (
    <div className={styles.screenDetailsContainer}>
      <div className={styles.dateContainer}>
        <DateSelector onSubmit={onSubmit} />
        <br />

        <SubmitButton
          type={"button"}
          onClick={showOverlay}
          disabled={date === ""}
          children={"Add show for this date"}
          className={styles.screenButton}
        />

        {overlay && date !== "" && (
          <>
            <form onSubmit={submitShow(onSubmitShow)}>
              <input {...registerShow("time")} type="text" placeholder="time" className={styles.formField}/>
              <SubmitButton
                type={"submit"}
                children={"Add Show"}
                className={styles.screenButton}
              />
            </form>
          </>
        )}
      </div>

      {date !== "" ? (
        <>
          <div className={styles.showsContainer}>
            {showsArr.length === 0 && <h1> No shows for this date</h1>}
            {<h1>{date}</h1>}
            {showsArr.map((show) => (
              <div key={show.showId} className={styles.showCard}>
                <LinkButton
                  to={`/show-bookings/${show.showId}`}
                  children={show.showId}
                  className={styles.showLink}
                />

                <h3>{show.time}</h3>
                <SubmitButton
                  type={"button"}
                  onClick={() => deleteShow(show.showId)}
                  children={"Delete Show"}
                  className={styles.screenButton}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1>No date selected yet</h1>
      )}
      <h2></h2>
    </div>
  );
};
