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
  u1RefreshToken,
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

/* POST /api/auth/register */

describe("POST /api/users/register", function () {
  test("OK to register New User", async function () {
    const resp = await request(app)
      .post(`/api/auth/register`)
      .send({
        username: "kimschaer",
        password: "Kim1991",
        firstName: "kim",
        lastName: "schaer",
        email: "kim.schaer93@gmail.com",
        gender: "male",
        birthYear: "2000",
        phone: "+41798490968",
        country: "switzerland",
        languages: ["german", "english", "french"],
        profileImgUrl: "google.com",
        bio: "surfer",
        role: "user",
      });

    expect(resp.statusCode).toEqual(201);
  });

  test("FAIL to register duplicate User", async function () {
    const resp = await request(app)
      .post(`/api/auth/register`)
      .send({
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

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toMatch("Duplicate username: testuser");
  });

  test("FAIL to register with missing data", async function () {
    const resp = await request(app).post(`/api/auth/register`).send({});

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toMatch("Validation for inputs failed");
  });

  test("FAIL to register with Invalid E-mail", async function () {
    const resp = await request(app)
      .post(`/api/auth/register`)
      .send({
        username: "kimschaer",
        password: "Kim1991",
        firstName: "kim",
        lastName: "schaer",
        email: "invalidEmail",
        gender: "male",
        birthYear: "2000",
        phone: "+41798490968",
        country: "switzerland",
        languages: ["german", "english", "french"],
        profileImgUrl: "google.com",
        bio: "surfer",
        role: "user",
      });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toMatch("Validation for inputs failed");
  });
});

/* POST /api/auth/login */

describe("POST /api/auth/login", function () {
  test("OK for registered user", async function () {
    const resp = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "password",
    });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body.success).toEqual(true);
    expect(resp.body.data.accessToken).toEqual(expect.any(String));
    expect(resp.body.data.refreshToken).toEqual(expect.any(String));
  });

  test("FAIL for NOT registered user", async function () {
    const resp = await request(app).post("/api/auth/login").send({
      username: "no-such-user",
      password: "password",
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("FAIL with wrong password", async function () {
    const resp = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "wrongPassword",
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("FAIL with to short password", async function () {
    const resp = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "1",
    });
    expect(resp.statusCode).toEqual(400);
  });

  test("FAIL with missing data", async function () {
    const resp = await request(app).post("/api/auth/login").send({
      username: "testuser",
    });
    expect(resp.statusCode).toEqual(400);
  });

  test("FAIL with invalid data", async function () {
    const resp = await request(app).post("/api/auth/login").send({
      username: 42,
      password: "above-is-a-number",
    });
    expect(resp.statusCode).toEqual(400);
  });
});

/* POST /api/auth/refresh-token */

describe("POST /api/auth/refresh-token", function () {
  test("OK for registered user", async function () {
    // login a user to get valid tokens
    const respLogin = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "password",
    });

    const refreshToken = respLogin.body.data.refreshToken;
    expect(refreshToken).toEqual(expect.any(String));

    const resp = await request(app).post("/api/auth/refresh-token").send({
      refreshToken,
    });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.success).toEqual(true);
    expect(resp.body.data.accessToken).toEqual(expect.any(String));
  });

  test("FAIL with invalid refresh token", async function () {
    const resp = await request(app)
      .post("/api/auth/refresh-token")
      .send("invalid-refresh-token");

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.success).toEqual(false);
  });
});
