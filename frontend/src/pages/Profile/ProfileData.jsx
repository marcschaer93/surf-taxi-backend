import React from "react";
import { Box, Card, Typography, Avatar, Divider, Button } from "@mui/material";
import { theme } from "../../utils/theme";
import { Link } from "react-router-dom";
// Icons import
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import LanguageIcon from "@mui/icons-material/Language";
import PublicIcon from "@mui/icons-material/Public";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
// Additional UI components
import { BottomSpacer } from "../../components/ui/BottomSpacer";
import { countryOptions } from "../../utils/countryOptions";
import { GenderIcon } from "../../components/ui/GenderIcon";
import TransgenderIcon from "@mui/icons-material/Transgender";

export const ProfileData = ({ userData }) => {
  const {
    firstName,
    lastName,
    email,
    gender,
    birthYear,
    phone,
    instagram,
    facebook,
    country,
    languages,
    profileImgUrl,
    bio,
  } = userData;

  return (
    <>
      {/* Profile Card Container */}
      <Box sx={{ p: 2 }}>
        {/* User Avatar and Name */}

        {/* Edit Profile */}
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Link to="/profile-edit">
            <Button size="small" variant="text" color="primary">
              Edit
            </Button>
          </Link>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              mb: 2,
            }}
          >
            <Avatar
              alt={`${firstName} ${lastName}`}
              src={profileImgUrl}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h5" sx={{ mt: 1 }}>
              {firstName} {lastName}
            </Typography>

            {/* User Bio */}
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {bio}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Contact Information and Personal Details */}

        <Box sx={{ mt: 2 }}>
          {/* Phone */}
          {/* <Typography
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <PhoneIcon sx={{ mr: 1 }} /> {phone}
          </Typography> */}

          {/* Languages Spoken */}
          <Typography
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <LanguageIcon sx={{ mr: 1 }} /> Speaks: {languages?.join(", ")}
          </Typography>

          {/* Country */}
          <Typography
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <PublicIcon sx={{ mr: 1 }} /> From{" "}
            {countryOptions.find((c) => c.code === country)?.name}
          </Typography>

          {/* Birth Year */}
          <Typography
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <CakeIcon sx={{ mr: 1 }} /> Born in {birthYear}
          </Typography>

          {/* Displaying Sex Information */}
          <Typography
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <TransgenderIcon sx={{ mr: 1 }} /> {gender}
          </Typography>

          {/* Email */}
          <Typography
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <EmailIcon sx={{ mr: 1 }} /> {email}
          </Typography>

          {/* Social Media Links (if available) */}
          {userData.instagram && (
            <Typography
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <InstagramIcon sx={{ mr: 1 }} /> Instagram: {instagram}
            </Typography>
          )}
          {facebook && (
            <Typography
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <FacebookIcon sx={{ mr: 1 }} /> Facebook: {facebook}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};
