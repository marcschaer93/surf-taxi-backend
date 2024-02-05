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
import { Favorites } from "../pages/Favorites";

export const AppRoutes = ({
  allTrips,
  myTrips,
  addTrip,
  setMyTrips,
  notifications,
}) => {
  return (
    <Routes>
      // HOME
      <Route
        path="/"
        element={<Home allTrips={allTrips} addTrip={addTrip} />}
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
        element={<AllTrips allTrips={allTrips} myTrips={myTrips} />}
      />
      <Route
        path="/my-trips"
        element={
          <RequireAuth>
            <MyTrips myTrips={myTrips} notifications={notifications} />
          </RequireAuth>
        }
      />
      <Route
        path="/new-trip"
        element={
          <RequireAuth>
            <NewTrip addTrip={addTrip} myTrips={myTrips} />
          </RequireAuth>
        }
      />
      <Route
        path="/trips/:tripId"
        element={
          <RequireAuth>
            <TripDetails setMyTrips={setMyTrips} myTrips={myTrips} />
          </RequireAuth>
        }
      />
      <Route
        path="/favorites"
        element={
          <RequireAuth>
            <Favorites myTrips={myTrips} />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
