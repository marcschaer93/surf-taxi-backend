import { useEffect, useState } from "react";
// import * as Api from "./api";
import * as Api from "./services/tripService";
import Login from "./components/Login";
import { Secret } from "./components/Secret";
import { Trips } from "./components/Trips";
import RequireAuth from "./components/RequireAuth";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/secret"
          element={
            <RequireAuth>
              <Secret />
            </RequireAuth>
          }
        />
        <Route
          path="/trips"
          element={
            <RequireAuth>
              <Trips />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
