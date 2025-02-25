import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { SubmitButton } from "../SubmitButton";
import { LinkButton } from "../LinkButton";

export const ScreenDetails = () => {
  type FormFields = {
    date: string;
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

  const { register, handleSubmit } = useForm<FormFields>();
  const { register: registerShow, handleSubmit: submitShow } =
    useForm<ShowFormFields>();

  const onSubmit = async (data: FormFields) => {
    const shows = await axios.get(
      `http://localhost:3000/shows/${screenId}/${data.date}`
    );
    setShowsArr(shows.data);
    setDate(data.date);
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="date" {...register("date")} />
        <SubmitButton type={"submit"} children={"Find for this date"} />
      </form>

      <SubmitButton
        type={"button"}
        onClick={showOverlay}
        disabled={date === ""}
        children={"Add show for this date"}
      />

      {overlay && date !== "" && (
        <>
          <form onSubmit={submitShow(onSubmitShow)}>
            <input {...registerShow("time")} type="text" placeholder="time" />
            <SubmitButton type={"submit"} children={"Add Show"} />
          </form>
        </>
      )}

      {date !== "" ? (
        <>
          {showsArr.length === 0 && <h1> No shows for this date</h1>}
          {showsArr.map((show) => (
            <div key={show.showId}>
              <LinkButton
                to={`/show-bookings/${show.showId}`}
                children={show.showId}
              />

              <h3>{show.time}</h3>
              <SubmitButton
                type={"button"}
                onClick={() => deleteShow(show.showId)}
                children={"Delete Show"}
              />
            </div>
          ))}
        </>
      ) : (
        <h1>No date selected yet</h1>
      )}
      <h2></h2>
    </>
  );
};
