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

export const Profile = ({ notifications }) => {
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

      <Box>
        <Link to="/profile-edit">
          <Button size="small" variant="outlined">
            Edit Profile
          </Button>
          <Button onClick={handleLogout} size="small" variant="outlined">
            Logout
          </Button>
        </Link>
      </Box>
      <BottomSpacer />
    </>
  );
};
