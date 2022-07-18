const request = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("Tests the login path", () => {
  test("Returns response containing access token if user exists", async () => {
    const response = await request(app).post("/login").send({
      email: "superadmin@mail.com",
      password: "12345",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      access_token: expect.any(String),
      role: "SuperAdmin",
    });
  });
  test("Returns appropriate response for an empty request", async () => {
    const response = await request(app).post("/login");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Email is required" });
  });
  test("Returns appropriate response if request doesn't contain email", async () => {
    const response = await request(app).post("/login").send({
      password: "12345",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Email is required" });
  });
  test("Returns appropriate response if request doesn't contain password", async () => {
    const response = await request(app).post("/login").send({
      email: "superadmin@mail.com",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Password is required" });
  });
  test("Returns appropriate response if creditentials don't match", async () => {
    const response = await request(app).post("/login").send({
      email: "superadmin@mail.com",
      password: "test",
    });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: "Invalid email/password" });
  });
});

// describe("Tests the mother list path", () => {
//   test("Returns response containing access token if user exists", async () => {
//     const response = await request(app).post("/login").send({
//       email: "superadmin@mail.com",
//       password: "12345",
//     });
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual({
//       access_token: expect.any(String),
//       role: "SuperAdmin",
//     });
//   });
// });
