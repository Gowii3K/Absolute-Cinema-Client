import axios from "axios";
import { useEffect, useState } from "react";
import { LinkButton } from "../LinkButton";
import { jwtDecode } from "jwt-decode";
import { DateSelector } from "../DateSelector";
import styles from "./UserHomePage.module.css";

export const UserHomePage = () => {

  const [date,setDate]=useState("")
  type Show = {
    showId: number;
    screenId: number;
    date: string;
    time: string;
    name:string;
    imageUrl?:string;
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
        sessionStorage.setItem("token",token);
        sessionStorage.setItem("userId", decodedUser.sub);
        setUserId(sessionStorage.getItem("userId"));
      }
    }
  }, []);

  useEffect(() => {
    console.log("user id has been set properly to :" + userId);
  }, [userId]);

  const onSubmit = async (data: { date?: string }) => {
    console.log(data);
    const shows = await axios.get(`http://localhost:3000/shows/${data.date}`);
    console.log(shows);
    setShowsArr(shows.data);
    if(data.date)setDate(data.date);
    
  };

  return (
    <div className={styles.homeContainer}>
      <h1>Welcome Back {userId}</h1>
      <h2>Find Shows for Date</h2>
      <DateSelector onSubmit={onSubmit} />
      <h2>{date}</h2>
    {!showsArr.length && <h2>No shows for this date</h2>}
      {showsArr.length !== 0 &&
        showsArr.map((show) => {
          return (
            <div key={show.showId} className={styles.showCard}>
              <LinkButton
                to={`/user-show-booking/${show.showId}`}
                children={<h3>{show.showId}</h3>}
              />
              <h4>{show.time}</h4>
              <h4>{show.screenId}</h4>
              <h4>{show.name}</h4>
              {show.imageUrl && (
                  <img
                    src={show.imageUrl}
                    alt={show.name}
                    className={styles.showImage} 
                  />
                )}
            </div>
          );
        })}
    </div>
  );
};
