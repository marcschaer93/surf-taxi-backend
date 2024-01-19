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

/* POST /api/passengers/trips/:tripId/join */

describe("POST /api/passengers/trips/:tripId/join", function () {
  test("OK to make a join request as loggedIn user and user_role", async function () {
    const resp = await request(app)
      .post(`/api/passengers/trips/${testTripIds[0]}/join`)
      .set("authorization", `Bearer ${u2AccessToken}`);

    expect(resp.statusCode).toEqual(201);
    expect(resp.body.success).toEqual(true);
    expect(resp.body.data.passenger).toEqual("marcschaer");
    expect(resp.body.data.newJoinRequest.reservation_status).toEqual(
      "requested"
    );
    expect(resp.body.data.newJoinRequest.username).toEqual("marcschaer");
    expect(resp.body.data.newJoinRequest.trip_id).toEqual(testTripIds[0]);
  });

  test("FAIL to make a join request as tripOwner to own trip", async function () {
    const resp = await request(app)
      .post(`/api/passengers/trips/${testTripIds[0]}/join`)
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toMatch(
      `Can't Request. You are the owner of the trip with ID: ${testTripIds[0]}.`
    );
  });
});

/* DELETE /api/passenger/trips/:tripId/join */

describe("DELETE /api/passenger/trips/:tripId/join", function () {
  test("OK remove own join request if not already 'confirmed'", async function () {
    const resp = await request(app)
      .delete(`/api/passengers/trips/${testTripIds[1]}/join`)
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.statusCode).toEqual(204);
  });

  test("FAIL remove own join request if already 'confirmed'", async function () {
    // change join request to confirmed first..
    await db.query(
      `
      UPDATE passengers
      SET reservation_status = $3
      WHERE trip_id = $1 
      AND username = $2
      `,
      [testTripIds[1], "testuser", "confirmed"]
    );

    const resp = await request(app)
      .delete(`/api/passengers/trips/${testTripIds[1]}/join`)
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.statusCode).toEqual(400);
  });
});

/* PATCH /api/passengers/trips/:tripId/join/:passengerUsername/respond */

describe("PATCH /api/passengers/trips/:tripId/join/:passengerUsername/respond", function () {
  test("OK to respond to a join request as tripOwner", async function () {
    const resp = await request(app)
      .patch(`/api/passengers/trips/${testTripIds[1]}/join/testuser/respond`)
      .set("authorization", `Bearer ${u2AccessToken}`)
      .send({ response: "confirmed" });

    expect(resp.statusCode).toEqual(200);
  });

  test("FAIL to respond to own trip as tripOwner", async function () {
    const resp = await request(app)
      .patch(`/api/passengers/trips/${testTripIds[0]}/join/testuser/respond`)
      .set("authorization", `Bearer ${u1AccessToken}`)
      .send({ response: "confirmed" });

    expect(resp.statusCode).toEqual(401);
    expect(resp.body.error.message).toMatch(
      "You are the trip owner and cannot perform this action."
    );
  });

  test("FAIL to respond to a join request as tripOwner if already 'confirmed'", async function () {
    const resp = await request(app)
      .patch(`/api/passengers/trips/${testTripIds[0]}/join/testuser/respond`)
      .set("authorization", `Bearer ${u1AccessToken}`)
      .send({ response: "confirmed" });

    expect(resp.statusCode).toEqual(401);
    expect(resp.body.error.message).toMatch(
      "You are the trip owner and cannot perform this action."
    );
  });
});
