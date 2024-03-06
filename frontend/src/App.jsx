import { Route, Routes, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { Stack, Box, Toolbar } from "@mui/material";
import { useMediaQuery } from "@mui/material";

import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Rightbar } from "./components/Rightbar";
import { AppRoutes } from "./components/AppRoutes";
import { BottomNavBar } from "./components/BottomNavBar";
import { useFetchAllTrips } from "./hooks/useFetchAllTrips";
import { useNotifications } from "./hooks/useNotifications";
import { useAuthContext } from "./context/authProvider";
import { MyTripsProvider } from "./context/MyTripsProvider";
import { Loading } from "./components/ui/Loading";
import { theme } from "./utils/theme";

const MainContent = styled(Box)(({ theme }) => ({
  flex: 4,
  padding: theme.spacing(3),
  width: "100%",
  // marginBottom: "100px",
}));

export default function App() {
  const { user } = useAuthContext();
  const location = useLocation();
  const { allTrips, loadingAllTrips } = useFetchAllTrips();
  const { notifications, markNotificationAsRead } = useNotifications(user);

  // Paths where the bottom navbar should be displayed
  const pathsWithBottomNavbar = [
    "/my-trips",
    "/",
    "/trips",
    "/favorites",
    "/my-profile",
    "/login",
    "/register",
    "/notifications",
  ];
  const shouldDisplayBottomNavbar = pathsWithBottomNavbar.includes(
    location.pathname
  );

  // Global loading state
  // const isLoading = loadingAllTrips || loadingMyTrips;
  const isLoading = loadingAllTrips;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* Show loading indicator if any loading state is true */}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <MyTripsProvider>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Sidebar />
              <MainContent>
                <AppRoutes
                  allTrips={allTrips}
                  notifications={notifications}
                  markNotificationAsRead={markNotificationAsRead}
                />
              </MainContent>
              <Rightbar />
            </Stack>

            {/* BottomNavBar */}
            {shouldDisplayBottomNavbar && isSmallScreen && (
              <BottomNavBar notifications={notifications} />
            )}
          </MyTripsProvider>
        </>
      )}
    </>
  );
}
