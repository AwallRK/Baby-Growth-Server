const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

const user1 = {
  nik: "222723440002",
  password: "12345",
};
const userNotExist = {
  nik: "2131",
  password: "12345",
};

const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiTklLIjoiMjIyNzIzNDQwMDAyIiwiaWF0IjoxNjU4MjE0NDUxfQ.KbaKj0_NMULoYBHqB0x9yA1BV6yyWLYhZiv-MQ_41Ec";

describe("Mother Routes Test", () => {
  test("200 Login - should return access token", (done) => {
    request(app)
      .post("/mother/login")
      .send(user1)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        expect(body).toHaveProperty("NIK", user1.nik);
        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("address");
        return done();
      });
  });

  test("401 Login - should return error", (done) => {
    request(app)
      .post("/mother/login")
      .send(user1)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid email/password");
        return done();
      });
  });

  test("400 Login - should return error", (done) => {
    request(app)
      .post("/mother/login")
      .send({ nik: user1.nik })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });

  // describe("GET /mother/pregnancy with correct token", () => {
  //   test("400 Login - should return error", (done) => {
  //     request(app)
  //       .post("mother/login")
  //       .send({nik:user1.nik})
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         const { body, status } = res;

  //         expect(status).toBe(400);
  //         expect(body).toHaveProperty("PregnancyDatum");
  //         return done();
  //       });
  //   });
  // });
});