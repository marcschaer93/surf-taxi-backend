import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import { TripDetails } from "./TripDetails";

export const AllTrips = ({ trips }) => {
  // console.log("trips", trips);
  return (
    <>
      {trips ? (
        <div>
          <h1>All Trips</h1>
          <ul>
            {trips.map((trip) => (
              <Box component="li" key={trip.id}>
                {/* <TripDetails tripDetails={trip} /> */}
                //{" "}
                <Link to={`/trips/${trip.id}`}>
                  // {`${trip.start_location} - ${trip.destination}`}
                  //{" "}
                </Link>
              </Box>
              // <li key={trip.id}>
              //   {" "}
              //   <Link to={`/trips/${trip.id}`}>
              //     {`${trip.start_location} - ${trip.destination}`}
              //   </Link>
              // </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No Trips</div>
      )}
    </>
  );
};
