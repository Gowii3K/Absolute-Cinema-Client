import axios from "axios";
import { useEffect, useState } from "react";
import { LinkButton } from "../LinkButton";
import { UserForm } from "../UserForm";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const UserHomePage = () => {
  type Show = {
    showId: number;
    screenId: number;
    date: string;
    time: string;
  };
  const [userId, setUserId] = useState<string | null>(
    sessionStorage.getItem("userId")
  );
  const [showsArr, setShowsArr] = useState<Show[]>([]);

  console.log(userId);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    console.log(token);
    if (token) {
      const decodedUser = jwtDecode(token);
      console.log(decodedUser);
      if (decodedUser.sub) {
        sessionStorage.setItem("userId", decodedUser.sub);
        setUserId(sessionStorage.getItem("userId"));
      }
    }
  }, []);

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
      <h1>{userId}</h1>
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
