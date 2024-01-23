import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { AllTrips } from "./pages/Trips/AllTrips";
import { Home } from "./pages/Home";
import { RequireAuth } from "./components/RequireAuth";
import { useTripData } from "./hooks/useTripData";
import { TripDetails } from "./pages/Trips/TripDetails";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { EditProfile } from "./pages/Profile/EditProfile";
import { Profile } from "./pages/Profile";
import { MyTrips } from "./pages/Trips/MyTrips";

export default function App() {
  const { trips, setTrips, addTrip } = useTripData();

  return (
    <>
      <Navbar />

      <Routes>
        // HOME
        <Route path="/" element={<Home trips={trips} addTrip={addTrip} />} />
        // USER ROUTES
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-edit" element={<EditProfile />} />
        // TRIP ROUTES
        <Route path="/trips" element={<AllTrips trips={trips} />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/trips/:tripId" element={<TripDetails />} />
      </Routes>
    </>
  );
}
