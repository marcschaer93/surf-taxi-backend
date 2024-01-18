"use strict";

const db = require("../db");
const UserApi = require("./users/userModel");
const TripApi = require("./trips/tripModel");
const AuthApi = require("./authentication/authModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/jwtTokens");

const TEST_DATE = "2023-04-16T00:00:00.000Z";

const testTripIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM trips");
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM passengers");

  await AuthApi.registerOneUser({
    username: "testuser",
    password: "password",
    first_name: "test_user",
    last_name: "hans",
    email: "testuser@gmail.com",
    gender: "male",
    birth_year: "2000",
    phone: "+41798490968",
    country: "switzerland",
    languages: ["german", "english", "french"],
    profile_img_url: "google.com",
    bio: "surfer",
    role: "user",
  });
  await AuthApi.registerOneUser({
    username: "testadmin",
    password: "password",
    first_name: "test_admin",
    last_name: "fritz",
    email: "testadmin@gmail.com",
    gender: "male",
    birth_year: "2000",
    phone: "+41798490968",
    country: "switzerland",
    languages: ["german", "english", "french"],
    profile_img_url: "google.com",
    bio: "surfer",
    role: "admin",
  });
  await AuthApi.registerOneUser({
    username: "marcschaer",
    password: "Marc1993",
    first_name: "marc",
    last_name: "schär",
    email: "marcschaer@gmail.com",
    gender: "male",
    birth_year: "1993",
    phone: "+41798490968",
    country: "switzerland",
    languages: ["german", "english", "french"],
    profile_img_url: "google.com",
    bio: "surfer",
    role: "user",
  });

  const resultTrip1 = await TripApi.createNewTrip(
    {
      date: new Date(TEST_DATE), // Use a JavaScript Date object,,
      start_location: "Interlaken",
      destination: "Sao Torpes",
      stops: "Somo",
      travel_info: "surftrip",
      costs: "split gas & tolls",
      seats: 5,
    },
    "testuser"
  );

  const resultTrip2 = await TripApi.createNewTrip(
    {
      date: new Date(TEST_DATE), // Use a JavaScript Date object,,
      start_location: "Sidi Ifni",
      destination: "Marseille",
      stops: "Imsoune",
      travel_info: "surftrip",
      costs: "split gas & tolls",
      seats: 2,
    },
    "marcschaer"
  );

  testTripIds[0] = resultTrip1.id;
  testTripIds[1] = resultTrip2.id;

  //   await User.applyToJob("u1", testJobIds[0]);
  await UserApi.requestToJoin(testTripIds[1], "testuser");
}
async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1AccessToken = generateAccessToken({
  username: "testuser",
  role: "user",
});
const u1RefreshToken = generateRefreshToken({
  username: "testuser",
  role: "user",
});
const adminAccessToken = generateAccessToken({
  username: "testadmin",
  role: "admin",
});
const adminRefreshToken = generateRefreshToken({
  username: "testadmin",
  role: "admin",
});
const u2AccessToken = generateAccessToken({
  username: "marcschaer",
  role: "user",
});
const u2RefreshToken = generateRefreshToken({
  username: "marcschaer",
  role: "user",
});

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTripIds,
  adminAccessToken,
  u1AccessToken,
  u2AccessToken,
  TEST_DATE,
};
