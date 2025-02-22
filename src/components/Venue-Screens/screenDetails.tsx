import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

export const ScreenDetails = () => {
  const { screenId } = useParams();
  const [showsArr, setShowsArr] = useState<
    { showId: number; screenId: number; date: string; time: string }[]
  >([]);

  type FormFields = {
    date: string;
  };

  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit = async (data: FormFields) => {
    const shows = await axios.get(
      `http://localhost:3000/shows/${screenId}/${data.date}`
    );
    setShowsArr(shows.data);
    console.log(showsArr);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="date" {...register("date")} />
        <button type="submit">Find for this date</button>
      </form>

      <h1>Shows for the Date for this Screen</h1>
      {showsArr.length !==0 ? (
        showsArr.map((show) => (
          <div key={show.showId}>
            <Link to={`/ShowBookings/${show.showId}`}>
            <h3>{show.showId}</h3>
            </Link>
            <h3>{show.time}</h3>
          </div>
        ))
      ) : (
        <h2>No shows for this time</h2>
      )}
    </>
  );
};
