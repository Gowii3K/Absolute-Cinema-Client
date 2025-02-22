import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const ShowBookings = () => {
  const { showId } = useParams();
  console.log(typeof showId);

  const num = Number(showId);
  console.log(num);
  const seatsToBeBooked = new Set<number>();

  const [bookingsArr, setBookingsArr] = useState<
    { seatNo: number; isBooked: boolean }[]
  >([]);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const getShows = async () => {
      const shows = await axios.get(`http://localhost:3000/bookings/${showId}`);
      setBookingsArr(shows.data);
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
    seatsToBeBooked.forEach((seat) => {
      console.log(seat);
      axios.post(`http://localhost:3000/bookings/`, {
        showId: Number(showId),
        seatNo: seat,
      });
    });

    const updatedShows = await axios.get(
      `http://localhost:3000/bookings/${showId}`
    );
    setBookingsArr(updatedShows.data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {bookingsArr.map((booking) => (
          <button
            type="button"
            key={booking.seatNo}
            onClick={() => bookSeat(booking.seatNo)}
            disabled={booking.isBooked}
          >
            {booking.seatNo}
          </button>
        ))}

        <button type="submit">Confirm</button>
      </form>
    </>
  );
};

export default ShowBookings;
