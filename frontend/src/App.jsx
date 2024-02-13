import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import AllTrips from "./pages/Trips/AllTrips";
import { Home } from "./pages/Home";
import { RequireAuth } from "./components/RequireAuth";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { EditProfile } from "./pages/Profile/EditProfile";
import { Profile } from "./pages/Profile";
import MyTrips from "./pages/Trips/MyTrips";
import { styled, useTheme } from "@mui/material/styles";
import { Stack, Box, Toolbar } from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import { Rightbar } from "./components/Rightbar";
import { AppRoutes } from "./components/AppRoutes";
import { BottomActionBar } from "./components/BottomActionBar";
import CircularProgress from "@mui/material/CircularProgress";

import { BottomNavBar } from "./components/BottomNavBar";
import { useAllTrips } from "./hooks/useAllTrips";
import { useMyTrips } from "./hooks/useMyTrips";
import { useNotifications } from "./hooks/useNotifications";
import { useAuthContext } from "./context/authProvider";

const MainContent = styled(Box)(({ theme }) => ({
  flex: 4,
  padding: theme.spacing(3),
  width: "100%",
  marginBottom: "100px",
}));

export default function App() {
  const { user } = useAuthContext();
  const location = useLocation();
  const { allTrips, loadingAllTrips } = useAllTrips();
  const { myTrips, setMyTrips, addTrip, loadingMyTrips } = useMyTrips();
  const { notifications, markNotificationAsRead } = useNotifications(user);

  // Paths where the bottom navbar should be displayed
  const pathsWithBottomNavbar = [
    "/my-trips",
    "/",
    "/trips",
    "/favorites",
    "/profile",
    "/login",
    "/register",
    "/notifications",
  ];
  const shouldDisplayBottomNavbar = pathsWithBottomNavbar.includes(
    location.pathname
  );

  function LoadingIndicator() {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Global loading state
  const isLoading = loadingAllTrips || loadingMyTrips;

  return (
    <>
      {/* Show loading indicator if any loading state is true */}
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar />
            <MainContent>
              <AppRoutes
                allTrips={allTrips}
                myTrips={myTrips}
                notifications={notifications}
                markNotificationAsRead={markNotificationAsRead}
                // Other props
              />
            </MainContent>
            <Rightbar />
          </Stack>

          {/* BottomNavBar */}
          {shouldDisplayBottomNavbar && <BottomNavBar />}
        </>
      )}
    </>
  );
}
