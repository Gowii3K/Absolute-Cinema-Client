import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const UserShowBooking = () => {
  const bookedSeats = new Set<number>();
  const { showId } = useParams();
  const userId = sessionStorage.getItem("userId");
  const [bookings, setBookings] = useState<
    { seatNo: number; isBooked: boolean }[]
  >([]);
  useEffect(() => {
    const getBookings = async () => {
      const books = await axios.get(`http://localhost:3000/bookings/${showId}`);
      setBookings(books.data);
      console.log(books);
    };

    getBookings();
  }, []);

  const bookSeats = async () => {
    const seatsArr = [...bookedSeats];
    console.log(seatsArr);
    await axios.post(`http://localhost:3000/bookings/`, {
      showId: Number(showId),
      seatNo: seatsArr,
      userId:Number(userId)
    });
    const updatedShows=await axios.get(`http://localhost:3000/bookings/${showId}`);
    setBookings(updatedShows.data);


  };

  const addSeat = (seatNo: number) => {
    console.log(seatNo);
    if (bookedSeats.has(seatNo)) {
      bookedSeats.delete(seatNo);
    } else {
      bookedSeats.add(seatNo);
    }
    console.log(bookedSeats);
  };

  return (
    <>
      {bookings.map((booking) => (
        <button
          type="button"
          onClick={() => addSeat(booking.seatNo)}
          disabled={booking.isBooked}
          key={booking.seatNo}
        >
          {booking.seatNo}
        </button>
      ))}
      <button type="button" onClick={bookSeats}>
        {" "}
        Done
      </button>
    </>
  );
};
