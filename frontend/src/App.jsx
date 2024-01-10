import { useEffect, useState } from "react";
import { Login } from "./pages/Login";
import { Route, Routes } from "react-router-dom";

import { Trips } from "./components/Trips";
import { Home } from "./pages/Home";
import { RequireAuth } from "./components/RequireAuth";
import { useTripData } from "./hooks/useTripData";

function App() {
  const { trips, setTrips, addTrip } = useTripData();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home trips={trips} addTrip={addTrip} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trips" element={<Trips />} />
      </Routes>
    </>
  );
}

export default App;
