import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Trips } from "./components/Trips";
import { Home } from "./pages/Home";
import { RequireAuth } from "./components/RequireAuth";
import { useTripData } from "./hooks/useTripData";
import { TripDetail } from "./components/TripDetail";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { EditProfile } from "./pages/Profile/EditProfile";
import { Profile } from "./pages/Profile";

export default function App() {
  const { trips, setTrips, addTrip } = useTripData();

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home trips={trips} addTrip={addTrip} />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-edit" element={<EditProfile />} />

        <Route path="/trips" element={<Trips trips={trips} />} />
        <Route path="/trips/:tripId" element={<TripDetail />} />
      </Routes>
    </>
  );
}
