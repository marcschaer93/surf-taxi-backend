"use strict";
const request = require("supertest");

const db = require("../../../db");
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

// Get all reservations for a specific trip
describe("GET /api/reservations/:tripId", function () {
  test("OK to get all reservations for a trip", async function () {
    const resp = await request(app)
      .get(`/api/reservations/${testTripIds[0]}`)
      .set("authorization", `Bearer ${u2AccessToken}`);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.success).toEqual(true);
  });
});

/* POST /api/reservations/trips/:tripId/join */

describe("POST /api/reservations/:tripId", function () {
  test("OK to create new reservation and make a join request as loggedIn user and user_role", async function () {
    const resp = await request(app)
      .post(`/api/reservations/${testTripIds[0]}`)
      .set("authorization", `Bearer ${u2AccessToken}`);

    expect(resp.statusCode).toEqual(201);
    expect(resp.body.success).toEqual(true);
    expect(resp.body.data).toHaveProperty("status", "requested");
    expect(resp.body.data).toHaveProperty("username", "marcschaer");
    expect(resp.body.data).toHaveProperty("tripId", expect.any(Number));
  });

  test("FAIL to make a join request as tripOwner to own trip", async function () {
    const resp = await request(app)
      .post(`/api/reservations/${testTripIds[0]}`)
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toMatch(
      `Can't Request. You are the owner of the trip with ID: ${testTripIds[0]}.`
    );
  });
});

/* DELETE /api/passenger/trips/:tripId/join */

describe("DELETE /api/reservations/:tripId", function () {
  test("OK remove own reservation (join request) if not already 'confirmed'", async function () {
    const resp = await request(app)
      .delete(`/api/reservations/${testTripIds[1]}`)
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.statusCode).toEqual(204);
  });

  test("FAIL remove own join request if already 'confirmed'", async function () {
    // change join request to confirmed first..
    await db.query(
      `
      UPDATE reservations
      SET status = $3
      WHERE trip_id = $1
      AND username = $2
      `,
      [testTripIds[1], "testuser", "confirmed"]
    );

    const resp = await request(app)
      .delete(`/api/reservations/${testTripIds[1]}`)
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.statusCode).toEqual(400);
  });
});

/* PATCH /api/reservationss/trips/:tripId/join/:passengerUsername/respond */

describe("PATCH /api/reservations/:tripId", () => {
  it("should update the reservation status and return the updated reservation", async () => {
    const tripId = testTripIds[1];
    const reservationUsername = "testuser";
    const newStatus = "confirmed";
    const token = u2AccessToken;

    const response = await request(app)
      .patch(`/api/reservations/${tripId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        reservationUsername,
        newStatus,
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("status", newStatus);
    expect(response.body.data).toHaveProperty("username", reservationUsername);
    expect(response.body.data).toHaveProperty("tripId", tripId);
  });

  test("FAIL to respond to own trip as tripOwner", async function () {
    const tripId = testTripIds[1];
    const reservationUsername = "marcschaer";
    const newStatus = "confirmed";
    const token = u2AccessToken;

    const resp = await request(app)
      .patch(`/api/reservations/${tripId}`)
      .set("authorization", `Bearer ${token}`)
      .send({ reservationUsername, newStatus });

    expect(resp.statusCode).toEqual(401);
    expect(resp.body.error.message).toMatch(
      "You are the trip owner and cannot perform this action."
    );
  });

  test("FAIL to respond to a join request as tripOwner if already 'confirmed'", async function () {
    const tripId = testTripIds[1];
    const reservationUsername = "testuser";
    const newStatus = "confirmed";
    const token = u2AccessToken;

    const resp = await request(app)
      .patch(`/api/reservations/${tripId}`)
      .set("authorization", `Bearer ${token}`)
      .send({ reservationUsername, newStatus });

    expect(resp.statusCode).toEqual(401);
    expect(resp.body.error.message).toMatch(
      "You are the trip owner and cannot perform this action."
    );
  });
});
