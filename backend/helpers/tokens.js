const jwt = require("jsonwebtoken");

const generateAccessToken = (username) => {
  const accessToken = jwt.sign(
    { username: username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "25s" }
  );

  return accessToken;
};

const generateRefreshToken = (username) => {
  const refreshToken = jwt.sign(
    { username: username },
    process.env.REFRESH_TOKEN_SECRET
    // { expiresIn: "1y" }
  );

  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
