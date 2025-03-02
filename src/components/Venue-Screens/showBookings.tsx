import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { SubmitButton } from "../SubmitButton";
import styles from "./ShowBookings.module.css";

const ShowBookings = () => {
  const { showId } = useParams();
  console.log(typeof showId);

  const num = Number(showId);
  console.log(num);
  const seatsToBeBooked = new Set<number>();

  const [bookingsArr, setBookingsArr] = useState<
    { seatNo: number; isBooked: boolean }[]
  >([]);

  useEffect(() => {
    const getShows = async () => {
      const shows = await axios.get(`http://localhost:3000/bookings/${showId}`);
      setBookingsArr(shows.data);
      console.log(shows);
    };

    getShows();
  }, []);

  const bookSeat = (seatNo: number) => {
    if (seatsToBeBooked.has(seatNo)) {
      seatsToBeBooked.delete(seatNo);
    } else {
      seatsToBeBooked.add(seatNo);
    }

    console.log(seatsToBeBooked);
  };

  const onSubmit = async () => {
    const seatsArray = [...seatsToBeBooked];

    await axios.post(`http://localhost:3000/bookings/`, {
      showId: Number(showId),
      seatNo: seatsArray,
    });

    const updatedShows = await axios.get(
      `http://localhost:3000/bookings/${showId}`
    );
    setBookingsArr(updatedShows.data);
  };

  return (
    <div className={styles.bookingContainer}>
      {bookingsArr.map((booking) => (
        <button
          type="button"
          key={booking.seatNo}
          onClick={() => bookSeat(booking.seatNo)}
          disabled={booking.isBooked}
          className={styles.seatButton}
        >
          {booking.seatNo}
        </button>
      ))}

      <button type="button" onClick={onSubmit}>
        Done
      </button>
    </div>
  );
};

export default ShowBookings;
