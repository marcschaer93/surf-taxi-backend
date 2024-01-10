import React, { useState } from "react";

import { useAuthContext } from "../../utils/authProvider";
import * as Api from "../../services/tripService";

export const TripForm = () => {
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    date: "2023-12-31",
    start_location: "Bern",
    destination: "Santander",
    stops: "Hossegor",
    travel_info: "surftrip",
    costs: "split gas \u0026 tolls",
    seats: 2,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Api.createTrip(formData);
  };

  const {
    date,
    start_location,
    destination,
    stops,
    travel_info,
    seats,
    costs,
  } = formData;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="date" value={date} onChange={handleChange} />
        <input
          type="text"
          name="start_location"
          value={start_location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="destination"
          value={destination}
          onChange={handleChange}
        />
        <input type="text" name="stops" value={stops} onChange={handleChange} />
        <input
          type="text"
          name="travel_info"
          value={travel_info}
          onChange={handleChange}
        />
        <input type="text" name="costs" value={costs} onChange={handleChange} />
        <input type="text" name="seats" value={seats} onChange={handleChange} />

        <button type="submit">Add Trip</button>
      </form>
    </>
  );
};
