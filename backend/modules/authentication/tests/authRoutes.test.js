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

/* GET /api/users */

describe("POST /api/users/register", function () {
  test("OK to register New User", async function () {
    const resp = await request(app)
      .post(`/api/auth/register`)
      .send({
        username: "kimschaer",
        password: "Kim1991",
        first_name: "kim",
        last_name: "schaer",
        email: "kim.schaer93@gmail.com",
        gender: "male",
        birth_year: "2000",
        phone: "+41798490968",
        country: "switzerland",
        languages: ["german", "english", "french"],
        profile_img_url: "google.com",
        bio: "surfer",
        role: "user",
      });

    expect(resp.statusCode).toEqual(201);
  });
});
