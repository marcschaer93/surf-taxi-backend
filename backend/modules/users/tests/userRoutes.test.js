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

/***************************** POST /api/users/:username/trips/:id/join-request */

// describe("POST /api/users/:username/trips/:id", function () {
//   test("OK to make a join request as loggedIn user and user_role", async function () {
//     const resp = await request(app)
//       .post(`/api/users/testuser/trips/${testTripIds[0]}/join-request`)
//       .set("authorization", `Bearer ${u2AccessToken}`);

//     expect(resp.statusCode).toEqual(201);
//     expect(resp.body.success).toEqual(true);
//     expect(resp.body.data.tripOwner).toEqual("testuser");
//     expect(resp.body.data.passenger).toEqual("marcschaer");
//     expect(resp.body.data.newJoinRequest.reservation_status).toEqual(
//       "requested"
//     );
//     expect(resp.body.data.newJoinRequest.username).toEqual("marcschaer");
//     expect(resp.body.data.newJoinRequest.trip_id).toEqual(testTripIds[0]);
//   });

//   test("FAIL to make a join request as tripOwner to own trip", async function () {
//     const resp = await request(app)
//       .post(`/api/users/testuser/trips/${testTripIds[0]}/join-request`)
//       .set("authorization", `Bearer ${u1AccessToken}`);

//     expect(resp.statusCode).toEqual(400);
//     expect(resp.body.error.message).toMatch(
//       `Can't Request. You are the owner of the trip with ID: ${testTripIds[0]}.`
//     );
//   });
// });

/************************************** DELETE /api/users/:username/trips/:id */

// describe("DELETE /api/users/:username/trips/:id/remove-join-request", function () {
//   test("OK remove own join request if not already 'confirmed'", async function () {
//     const resp = await request(app)
//       .delete(`/api/users/testuser/trips/${testTripIds[1]}/remove-join-request`)
//       .set("authorization", `Bearer ${u1AccessToken}`);

//     expect(resp.statusCode).toEqual(204);
//   });

//   test("FAIL remove own join request if already 'confirmed'", async function () {
//     const resp = await request(app)
//       .delete(`/api/users/testuser/trips/${testTripIds[1]}/remove-join-request`)
//       .set("authorization", `Bearer ${u1AccessToken}`);

//     expect(resp.statusCode).toEqual(400);
//   });
// });
