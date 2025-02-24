import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const UserHomePage = () => {
  type Show = {
    showId: number;
    screenId: number;
    date: string;
    time: string;
  };
  const [showsArr, setShowsArr] = useState<Show[]>([]);
  const { register, handleSubmit } = useForm<{ date: string }>();

  useEffect(() => {}, []);

  const onSubmit = async (data: { date: string }) => {
    console.log(data);
    const shows = await axios.get(`http://localhost:3000/shows/${data.date}`);
    console.log(shows);
    setShowsArr(shows.data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("date")} type="date" />
        <button type="submit">Find for this date</button>
      </form>

      {showsArr.length !== 0 &&
        showsArr.map((show) => {
          return (
            <div key={show.showId}>
              <Link to={`/UserShowBooking/${show.showId}`}>
              <h3>{show.showId}</h3>
              </Link>
              <h4>{show.time}</h4>
              <h4>{show.screenId}</h4>
            </div>
          );
        })}
    </>
  );
};
