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
  adminAccesstoken,
  TEST_DATE,
} = require("../../testSetupRoutes");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// /************************************** POST /api/users/:username/trips/:id */

describe("POST /api/users/:username/trips/:id", function () {
  test("ok to make a trip request as loggedIn user and user_role", async function () {
    const resp = await request(app)
      .post(`/api/users/marcschaer/trips/${testTripIds[0]}`)
      .set("authorization", `Bearer ${u2AccessToken}`);

    expect(resp.statusCode).toEqual(201);
    expect(resp.body.member_status).toEqual("requested");
    expect(resp.body.username).toEqual("marcschaer");
    expect(resp.body.trip_id).toEqual(testTripIds[0]);
  });

  test("fail to make a trip request as tripOwner, loggedIn user and user_role", async function () {
    const resp = await request(app)
      .post(`/api/users/testuser/trips/${testTripIds[0]}`)
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toMatch(
      `Can't Request. You are the owner of the trip with ID: ${testTripIds[0]}.`
    );
  });
});
