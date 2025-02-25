import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LinkButton } from "../LinkButton";
import { SubmitButton } from "../SubmitButton";

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
        <SubmitButton type={"submit"} children={"Submit"} />
      </form>

      {showsArr.length !== 0 &&
        showsArr.map((show) => {
          return (
            <div key={show.showId}>
              <LinkButton
                to={`/user-show-booking/${show.showId}`}
                children={<h3>show.showId</h3>}
              />
              <h4>{show.time}</h4>
              <h4>{show.screenId}</h4>
            </div>
          );
        })}
    </>
  );
};
