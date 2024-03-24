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

/* GET /api/users/:username/profile */

describe("GET /api/users/:username", function () {
  test("OK to get own user profile", async function () {
    const resp = await request(app)
      .get(`/api/users/testuser`)
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.statusCode).toEqual(200);
  });
});
