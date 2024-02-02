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
import { styled, useTheme } from "@mui/material/styles";
import { Stack, Box } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { Rightbar } from "./components/Rightbar";
import { AppRoutes } from "./components/AppRoutes";

import { BottomNavBar } from "./components/BottomNavBar";

const MainContent = styled(Box)(({ theme }) => ({
  flex: 4,
  padding: theme.spacing(3),
  width: "100%",
}));

export default function App() {
  const { allTrips, myTrips, setMyTrips, addTrip } = useTripData();

  return (
    <>
      <Navbar />

      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <MainContent>
          <AppRoutes
            allTrips={allTrips}
            addTrip={addTrip}
            myTrips={myTrips}
            setMyTrips={setMyTrips}
          />
        </MainContent>
        <Rightbar />
      </Stack>

      <BottomNavBar sx={{ display: { sm: "none" } }} />
    </>
  );
}
