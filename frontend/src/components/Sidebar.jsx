import { Box } from "@mui/material";

export const Sidebar = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "skyblue",
          flex: 1,
          p: 2,
          display: { xs: "none", sm: "flex" },
        }}
      >
        Sidebar
      </Box>
    </>
  );
};
