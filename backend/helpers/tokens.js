const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET
    // { expiresIn: "10m" }
  );

  return accessToken;
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET
    // { expiresIn: "1y" }
  );

  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
