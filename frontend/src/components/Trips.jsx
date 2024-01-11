import { useEffect, useState } from "react";
import { TripDetail } from "./TripDetail";
import { Link } from "react-router-dom";

export const Trips = ({ trips }) => {
  console.log("trips", trips);
  return (
    <>
      {trips ? (
        <div>
          <h1>All Trips</h1>
          <ul>
            {trips.map((trip) => (
              <li key={trip.id}>
                {" "}
                <Link to={`/trips/${trip.id}`}>
                  {`${trip.start_location} - ${trip.destination}`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No Trips</div>
      )}
    </>
  );
};
