import React from "react";
import { Link } from "react-router-dom";
import { EditProfile } from "./EditProfile";
import { IconButton, Badge, Box, Typography, Button } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useNotifications } from "../../hooks/useNotifications";
import { useAuthContext } from "../../context/authProvider";
import { Title, TitleDivider } from "../../styles/fontStyles";
import { theme } from "../../utils/theme";
import { NotificationButton } from "../../components/ui/NotificationButton";
import { ProfileData } from "./ProfileData";
import { BottomSpacer } from "../../components/ui/BottomSpacer";

export const MyProfile = ({ notifications }) => {
  const { user } = useAuthContext();
  // const { notifications } = useNotifications(user);
  // console.log("NOTIFICATION", notifications);
  const { handleLogout } = useAuthContext();
  return (
    <>
      <Box>
        <NotificationButton notifications={notifications} />
        <Title variant="h3">Profile</Title>
        <TitleDivider />
      </Box>

      {/* Profile Data */}
      <ProfileData userData={user} />

      <Box sx={{ pt: 5 }}>
        {/* <Link to="/profile-edit">
          <Button size="small" variant="contained" color="primary">
            Edit Profile
          </Button>
        </Link> */}

        <Button onClick={handleLogout} size="small" variant="text">
          Logout
        </Button>
      </Box>
      <BottomSpacer />
    </>
  );
};
