import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Profile } from "../pages/Profile";
import { EditProfile } from "../pages/Profile/EditProfile";
import { AllTrips } from "../pages/Trips/AllTrips";
import { MyTrips } from "../pages/Trips/MyTrips";
import { TripDetails } from "../pages/Trips/TripDetails";
import { RequireAuth } from "../components/RequireAuth";
import { NewTrip } from "../pages/Trips/NewTrip";

export const AppRoutes = ({ allTrips, userTrips, addTrip }) => {
  return (
    <Routes>
      // HOME
      <Route
        path="/"
        element={
          <Home allTrips={allTrips} userTrips={userTrips} addTrip={addTrip} />
        }
      />
      // USER ROUTES
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/profile-edit"
        element={
          <RequireAuth>
            <EditProfile />
          </RequireAuth>
        }
      />
      // TRIP ROUTES
      <Route
        path="/trips"
        element={<AllTrips allTrips={allTrips} userTrips={userTrips} />}
      />
      <Route
        path="/my-trips"
        element={
          <RequireAuth>
            <MyTrips userTrips={userTrips} />
          </RequireAuth>
        }
      />
      <Route
        path="/new-trip"
        element={
          <RequireAuth>
            <NewTrip addTrip={addTrip} />
          </RequireAuth>
        }
      />
      <Route
        path="/trips/:tripId"
        element={
          <RequireAuth>
            <TripDetails />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
