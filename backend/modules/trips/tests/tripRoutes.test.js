"use strict";
const request = require("supertest");

const app = require("../../../app");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTripIds,
  u1AccessToken,
  u2AccessToken,
  adminAccessToken,
  TEST_DATE,
} = require("../../testSetupRoutes");

beforeAll(async () => {
  await commonBeforeAll();
});

beforeEach(async () => {
  await commonBeforeEach();
});

afterEach(async () => {
  await commonAfterEach();
});

afterAll(async () => {
  await commonAfterAll();
});

/************************************** GET /api/trips */

describe("GET /api/trips", function () {
  test("OK for user_role", async function () {
    const resp = await request(app)
      .get(`/api/trips`)
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.data).toEqual([
      {
        id: testTripIds[0],
        owner: "testuser",
        date: TEST_DATE,
        start_location: "Interlaken",
        destination: "Sao Torpes",
        stops: "Somo",
        travel_info: "surftrip",
        costs: "split gas & tolls",
        seats: 5,
      },
      {
        id: testTripIds[1],
        date: TEST_DATE,
        owner: "marcschaer",
        start_location: "Sidi Ifni",
        destination: "Marseille",
        stops: "Imsoune",
        travel_info: "surftrip",
        costs: "split gas & tolls",
        seats: 2,
      },
    ]);
  });
});

/************************************** GET /api/trips/:tripId */

describe("GET /api/trips/:tripId", function () {
  test("FAIL if trip not exists", async function () {
    const resp = await request(app)
      .get(`/api/trips/0`)
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.statusCode).toEqual(404);
    expect(resp.body.error.message).toMatch("No tripDetails found with ID: 0");
  });
});

describe("GET /api/trips/:tripId", function () {
  test("OK for user_role", async function () {
    const resp = await request(app)
      .get(`/api/trips/${testTripIds[0]}`)
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.body.data).toEqual({
      id: testTripIds[0],
      date: TEST_DATE,
      owner: "testuser",
      start_location: "Interlaken",
      destination: "Sao Torpes",
      stops: "Somo",
      travel_info: "surftrip",
      costs: "split gas & tolls",
      seats: 5,
      passengers: [
        {
          status: null,
          username: null,
        },
      ],
    });
  });
});

/************************************** POST /api/trips */

describe("POST /api/trips", function () {
  test("OK for user_role", async function () {
    const resp = await request(app)
      .post(`/api/trips`)
      .send({
        date: new Date(TEST_DATE), // Use a JavaScript Date object
        start_location: "newTestTrip",
        destination: "testland",
        stops: "Somo",
        travel_info: "surftrip",
        costs: "split gas & tolls",
        seats: 5,
      })
      .set("authorization", `Bearer ${u1AccessToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body.success).toEqual(true);
    expect(resp.body.data).toEqual({
      id: expect.any(Number),
      date: TEST_DATE,
      owner: "testuser",
      start_location: "newTestTrip",
      destination: "testland",
      stops: "Somo",
      travel_info: "surftrip",
      costs: "split gas & tolls",
      seats: 5,
    });
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
      .post(`/api/trips`)
      .set("authorization", `Bearer ${u1AccessToken}`)
      .send({
        start_location: "Interlaken",
      });
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
      .post(`/api/trips`)
      .send({
        date: "wrong-data-format",
      })
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.statusCode).toEqual(400);
  });
});
