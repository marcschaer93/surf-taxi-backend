"use strict";

const db = require("../db");
const UserApi = require("./users/userModel");
const TripApi = require("./trips/tripModel");
const AuthApi = require("./authentication/authModel");
const ReservationApi = require("./reservations/reservationModel");
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
  await db.query("DELETE FROM reservations");

  await AuthApi.registerUser({
    username: "testuser",
    password: "password",
    firstName: "test_user",
    lastName: "hans",
    email: "testuser@gmail.com",
    gender: "male",
    birthYear: "2000",
    phone: "+41798490968",
    country: "switzerland",
    languages: ["german", "english", "french"],
    profileImgUrl: "google.com",
    bio: "surfer",
    role: "user",
  });

  await AuthApi.registerUser({
    username: "testadmin",
    password: "password",
    firstName: "test_admin",
    lastName: "fritz",
    email: "testadmin@gmail.com",
    gender: "male",
    birthYear: "2000",
    phone: "+41798490968",
    country: "switzerland",
    languages: ["german", "english", "french"],
    profileImgUrl: "google.com",
    bio: "surfer",
    role: "admin",
  });

  await AuthApi.registerUser({
    username: "marcschaer",
    password: "Marc1993",
    firstName: "marc",
    lastName: "schär",
    email: "marcschaer@gmail.com",
    gender: "male",
    birthYear: "1993",
    phone: "+41798490968",
    country: "switzerland",
    languages: ["german", "english", "french"],
    profileImgUrl: "google.com",
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
  await ReservationApi.createNewReservation(testTripIds[1], "testuser");
}
async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  try {
    await db.query("ROLLBACK");
  } catch (error) {
    console.error("Error during rollback:", error);
  }
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
  u1RefreshToken,
  TEST_DATE,
};
