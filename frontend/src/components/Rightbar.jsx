import { Box } from "@mui/material";

export const Rightbar = () => {
  return (
    <>
      {process.env.NODE_ENV === "development" ? (
        <Box
          sx={{
            height: "100%",
            backgroundColor: "lightgreen",
            flex: 1,
            p: 2,
            display: { xs: "none", md: "flex" },
          }}
        >
          Rightbar (dev mode)
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
