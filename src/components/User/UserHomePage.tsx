import axios from "axios";
import { useState } from "react";
import { LinkButton } from "../LinkButton";
import { UserForm } from "../UserForm";

export const UserHomePage = () => {
  type Show = {
    showId: number;
    screenId: number;
    date: string;
    time: string;
  };
  const [showsArr, setShowsArr] = useState<Show[]>([]);

  const onSubmit = async (data: { date?: string }) => {
    console.log(data);
    const shows = await axios.get(`http://localhost:3000/shows/${data.date}`);
    console.log(shows);
    setShowsArr(shows.data);
  };

  const props = {
    onSubmit: onSubmit,
    values: {
      date: true,
    },
  };
  return (
    <>
      <UserForm {...props} />

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
