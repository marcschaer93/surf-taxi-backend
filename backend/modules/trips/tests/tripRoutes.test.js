const db = require("../../../db/db");
const UserApi = require("../../users/userModel");
const TripApi = require("../tripModel");
const AuthApi = require("../../authentication/authModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../../helpers/jwtTokens");
const request = require("supertest");
const app = require("../../../app");

const TEST_DATE = "2023-04-16T00:00:00.000Z";
const TEST_USERNAME = "testuser";
const TEST_ADMIN_USERNAME = "testadmin";
const TEST_TRIP_ID_INVALID = 99999;
const TEST_TRIP_ID_VALID = 1;

const testTripIds = [];

const testuserAccessToken = generateAccessToken({
  username: TEST_USERNAME,
  role: "user",
});
const testuserRefreshToken = generateRefreshToken({
  username: TEST_USERNAME,
  role: "user",
});

const testadminAccessToken = generateAccessToken({
  username: TEST_ADMIN_USERNAME,
  role: "user",
});
const testadminRefreshToken = generateRefreshToken({
  username: TEST_ADMIN_USERNAME,
  role: "user",
});

async function clearDatabase() {
  await db.query("DELETE FROM trips");
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM trip_members");
}

async function registerTestUser() {
  await AuthApi.registerOneUser({
    username: TEST_USERNAME,
    password: "password",
    first_name: "test_user",
    last_name: "hans",
    email: "testuser@gmail.com",
    gender: "male",
    birth_year: "2000",
    phone: "+41798490968",
    country: "switzerland",
    languages: ["german", "english", "french"],
    profile_img_url: "google.com",
    bio: "surfer",
    role: "user",
  });
  await AuthApi.registerOneUser({
    username: TEST_ADMIN_USERNAME,
    password: "password",
    first_name: "test_admin",
    last_name: "fritz",
    email: "testadmin@gmail.com",
    gender: "male",
    birth_year: "2000",
    phone: "+41798490968",
    country: "switzerland",
    languages: ["german", "english", "french"],
    profile_img_url: "google.com",
    bio: "surfer",
    role: "admin",
  });
}

async function createTestTrip() {
  const result = await TripApi.createNewTrip(
    {
      date: new Date(TEST_DATE), // Use a JavaScript Date object,,
      start_location: "Interlaken",
      destination: "Sao Torpes",
      stops: "Somo",
      travel_info: "surftrip",
      costs: "split gas & tolls",
      seats: 5,
    },
    TEST_USERNAME
  );

  testTripIds[0] = result.id;
}

async function initializeTripDatabase() {
  await clearDatabase();
  await registerTestUser();
  await createTestTrip();
}

beforeAll(async () => {
  await initializeTripDatabase();
});

beforeEach(async () => {
  await db.query("BEGIN");
});

afterEach(async () => {
  await db.query("ROLLBACK");
});

afterAll(async () => {
  await clearDatabase();
  await db.end();
});

/************************************** GET /api/trips */

describe("GET /api/trips", function () {
  test("ok for user_role", async function () {
    const resp = await request(app)
      .get(`/api/trips`)
      .set("authorization", `Bearer ${testuserAccessToken}`);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      allTrips: [
        {
          id: expect.any(Number),
          date: TEST_DATE,
          start_location: "Interlaken",
          destination: "Sao Torpes",
          stops: "Somo",
          travel_info: "surftrip",
          costs: "split gas & tolls",
          seats: 5,
        },
      ],
    });
  });
});

/************************************** GET /api/trips/:id */

describe("GET /api/trips/:id", function () {
  test("ok for user_role", async function () {
    const resp = await request(app).get(`/api/trips/${testTripIds[0]}}`);
    expect(resp.body).toEqual({
      trip: {
        id: testTripIds[0],
        date: TEST_DATE,
        start_location: "Interlaken",
        destination: "Sao Torpes",
        stops: "Somo",
        travel_info: "surftrip",
        available_seats: "4",
        costs: "split gas & tolls",
        seats: 5,
        trip_members: [
          {
            status: "owner",
            username: "testuser",
          },
        ],
      },
    });
  });

  test("not found for no such trip", async function () {
    const resp = await request(app)
      .get(`/api/trips/${TEST_TRIP_ID_INVALID}`)
      .set("authorization", `Bearer ${testuserAccessToken}`);

    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** POST /api/trips */

describe("POST /api/trips", function () {
  test("ok for user_role", async function () {
    const resp = await request(app)
      .post(`/api/trips`)
      .send(
        {
          date: new Date(TEST_DATE), // Use a JavaScript Date object
          start_location: "Interlaken",
          destination: "Sao Torpes",
          stops: "Somo",
          travel_info: "surftrip",
          costs: "split gas & tolls",
          seats: 5,
        },
        TEST_USERNAME
      )
      .set("authorization", `Bearer ${testuserAccessToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      newTrip: {
        id: expect.any(Number),
        date: TEST_DATE,
        start_location: "Interlaken",
        destination: "Sao Torpes",
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
      .set("authorization", `Bearer ${testuserAccessToken}`)
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
      .set("authorization", `Bearer ${testuserAccessToken}`);

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
