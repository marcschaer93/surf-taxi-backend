import { useEffect, useState } from "react";
// import * as Api from "./api";
import * as Api from "./services/tripService";
import { Login } from "./pages/Login";
import { Route, Routes } from "react-router-dom";

import { Trips } from "./components/Trips";
import { Home } from "./pages/Home";
import { RequireAuth } from "./components/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trips" element={<Trips />} />
      </Routes>
    </>
  );
}

export default App;
