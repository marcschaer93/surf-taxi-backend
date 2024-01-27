import { Box } from "@mui/material";

export const Rightbar = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "lightgreen",
          flex: 1,
          p: 2,
          display: { xs: "none", sm: "flex" },
        }}
      >
        Rightbar
      </Box>
    </>
  );
};
