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
  test("ok for user_role", async function () {
    const resp = await request(app)
      .get(`/api/trips`)
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      allTrips: [
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
      ],
    });
  });
});

describe("GET /api/trips/:id", function () {
  test("not found for no such trip", async function () {
    const resp = await request(app)
      .get(`/api/trips/0`)
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** GET /api/trips/:id */

describe("GET /api/trips/:id", function () {
  test("ok for user_role", async function () {
    const resp = await request(app)
      .get(`/api/trips/${testTripIds[0]}`)
      .set("authorization", `Bearer ${u1AccessToken}`);

    expect(resp.body).toEqual({
      trip: {
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
      },
    });
  });
});

/************************************** POST /api/trips */

describe("POST /api/trips", function () {
  test("ok for user_role", async function () {
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
    expect(resp.body).toEqual({
      newTrip: {
        id: expect.any(Number),
        date: TEST_DATE,
        owner: "testuser",
        start_location: "newTestTrip",
        destination: "testland",
        stops: "Somo",
        travel_info: "surftrip",
        costs: "split gas & tolls",
        seats: 5,
      },
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

/************************************** PATCH /api/trips/:id */

// describe("PATCH /jobs/:id", function () {
//   test("works for admin", async function () {
//     const resp = await request(app)
//       .patch(`/jobs/${testJobIds[0]}`)
//       .send({
//         title: "J-New",
//       })
//       .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.body).toEqual({
//       job: {
//         id: expect.any(Number),
//         title: "J-New",
//         salary: 1,
//         equity: "0.1",
//         companyHandle: "c1",
//       },
//     });
//   });

//   test("unauth for others", async function () {
//     const resp = await request(app)
//       .patch(`/jobs/${testJobIds[0]}`)
//       .send({
//         title: "J-New",
//       })
//       .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("not found on no such job", async function () {
//     const resp = await request(app)
//       .patch(`/jobs/0`)
//       .send({
//         handle: "new",
//       })
//       .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(400);
//   });

//   test("bad request on handle change attempt", async function () {
//     const resp = await request(app)
//       .patch(`/jobs/${testJobIds[0]}`)
//       .send({
//         handle: "new",
//       })
//       .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(400);
//   });

//   test("bad request with invalid data", async function () {
//     const resp = await request(app)
//       .patch(`/jobs/${testJobIds[0]}`)
//       .send({
//         salary: "not-a-number",
//       })
//       .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(400);
//   });
// });

/************************************** DELETE /api/trips/:id */

// describe("DELETE /trips/:id", function () {
//   test("ok for admin_role", async function () {
//     const resp = await request(app)
//       .delete(`/jobs/${testJobIds[0]}`)
//       .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.body).toEqual({ deleted: testJobIds[0] });
//   });

//   test("unauth for others", async function () {
//     const resp = await request(app)
//       .delete(`/jobs/${testJobIds[0]}`)
//       .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("unauth for anon", async function () {
//     const resp = await request(app).delete(`/jobs/${testJobIds[0]}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("not found for no such job", async function () {
//     const resp = await request(app)
//       .delete(`/jobs/0`)
//       .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(404);
//   });
// });
