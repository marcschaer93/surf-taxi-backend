import React from "react";
import { Box, Card, Typography, Avatar, Divider } from "@mui/material";
import { theme } from "../../utils/theme";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import LanguageIcon from "@mui/icons-material/Language";
import PublicIcon from "@mui/icons-material/Public";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { BottomSpacer } from "../../components/ui/BottomSpacer";

export const ProfileData = ({ userData }) => {
  return (
    // <Card sx={{ maxWidth: 345, m: 2, bgcolor: theme.palette.background.paper }}>
    <>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            mb: 2,
          }}
        >
          <Avatar
            alt={`${userData.first_name} ${userData.last_name}`}
            src={userData.profileImgUrl}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h5" sx={{ mt: 1 }}>
            {userData.firstName} {userData.lastName}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {userData.bio}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 2 }}>
          <Typography
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <EmailIcon sx={{ mr: 1 }} /> {userData.email}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <PhoneIcon sx={{ mr: 1 }} /> {userData.phone}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <CakeIcon sx={{ mr: 1 }} /> Born in {userData.birthYear}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <PublicIcon sx={{ mr: 1 }} /> From {userData.country}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <LanguageIcon sx={{ mr: 1 }} /> Speaks {userData.languages}
          </Typography>
          {userData.instagram && (
            <Typography
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <InstagramIcon sx={{ mr: 1 }} /> Instagram: {userData.instagram}
            </Typography>
          )}
          {userData.facebook && (
            <Typography
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <FacebookIcon sx={{ mr: 1 }} /> Facebook: {userData.facebook}
            </Typography>
          )}
        </Box>
      </Box>
    </>
    // </Card>
  );
};
