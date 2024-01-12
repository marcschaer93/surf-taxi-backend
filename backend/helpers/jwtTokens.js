const jwt = require("jsonwebtoken");

//** Generates tokens with (username, role) */
// roles : "user", "admin"

const generateAccessToken = ({ username, role }) => {
  const accessToken = jwt.sign(
    { username: username, role: role },
    process.env.ACCESS_TOKEN_SECRET,
    // { expiresIn: "20m" }
    { expiresIn: "1y" }
  );

  return accessToken;
};

const generateRefreshToken = ({ username, role }) => {
  const refreshToken = jwt.sign(
    { username: username, role: role },
    process.env.REFRESH_TOKEN_SECRET
    // { expiresIn: "1y" }
  );

  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
