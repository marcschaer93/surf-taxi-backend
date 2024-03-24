const jwt = require("jsonwebtoken");

//** Generates tokens with (username, role) */
// roles : "user", "admin"

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    { username: user.username, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    // { expiresIn: "20m" }
    { expiresIn: "1y" }
  );

  return accessToken;
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { username: user.username, role: user.role },
    process.env.REFRESH_TOKEN_SECRET
    // { expiresIn: "1y" }
  );

  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
