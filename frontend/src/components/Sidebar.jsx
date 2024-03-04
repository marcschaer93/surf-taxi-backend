import { Box } from "@mui/material";

export const Sidebar = () => {
  return (
    <>
      {process.env.NODE_ENV === "development" ? (
        <Box
          sx={{
            height: "100%",
            backgroundColor: "skyblue",
            flex: 1,
            p: 2,
            display: { xs: "none", md: "flex" },
          }}
        >
          Sidebar (dev mode)
        </Box>
      ) : (
        <Box
          sx={{
            flex: 1,
            p: 2,
            display: { xs: "none", md: "flex" },
          }}
        ></Box>
      )}
    </>
  );
};
