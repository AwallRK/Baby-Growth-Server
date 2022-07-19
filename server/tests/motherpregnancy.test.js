const request = require("supertest");
const app = require("../app");
const users = require("../data/users.json");
const mothers = require("../data/mothers.json");
const pregnancies = require("../data/pregnancies.json");
const pregnancyData = require("../data/pregnancyData.json");
const babyData = require("../data/babyData.json");
const { signToken } = require("../helpers/jwt");
const {
  User,
  MotherProfile,
  Pregnancy,
  PregnancyData,
  BabyData,
} = require("../models");
const { hashPassword } = require("../helpers/bcrypt");

let access_token = "";
beforeAll(async () => {
  try {
    users.forEach((user) => {
      user.password = hashPassword(user.password);
      user.createdAt = new Date();
      user.updatedAt = new Date();
    });
    mothers.forEach((mother) => {
      mother.password = hashPassword(mother.password);
      mother.createdAt = new Date();
      mother.updatedAt = new Date();
    });

    await User.destroy({
      where: {},
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
    await MotherProfile.destroy({
      where: {},
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
    await Pregnancy.destroy({
      where: {},
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
    await PregnancyData.destroy({
      where: {},
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });
    await BabyData.destroy({
      where: {},
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });

    console.log(mothers);
    await User.bulkCreate(users);
    await MotherProfile.bulkCreate(mothers);
    await Pregnancy.bulkCreate(pregnancies);
    await PregnancyData.bulkCreate(pregnancyData);
    await BabyData.bulkCreate(babyData);

    access_token = signToken({
      id: 99,
      role: "SuperAdmin",
    });
  } catch (err) {
    console.log(err, `before all error!`);
  }
});

const user1 = {
  NIK: "222224440000",
  password: "12345",
};
const userNotExist = {
  NIK: "2131",
  password: "12345",
};

const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiTklLIjoiMjIyMjIzMjQ0MjkxMTEiLCJpYXQiOjE2NTgyMjYyNTN9.iB-Bwycc-Ek4quKKgZMJ7OrsGa-t4NNyZPrdbOz_Vfw";
// post /mother/login (done)

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
        expect(body).toHaveProperty("NIK", user1.NIK);
        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("address");
        return done();
      });
  });

  test("401 Login - should return error", (done) => {
    request(app)
      .post("/mother/login")
      .send(userNotExist)
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
      .send({ NIK: user1.NIK })
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

// get /mother/category
// post /mother/category
// get /mother/category/:id/article
// post /mother/category/:id/article
// get /mother/categoryMonth/:id
// post /mother/categoryMonth/:id
// get /mother/pregnancy

afterAll(async () => {
  await User.destroy({
    where: {},
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  await MotherProfile.destroy({
    where: {},
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  await Pregnancy.destroy({
    where: {},
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  await PregnancyData.destroy({
    where: {},
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  await BabyData.destroy({
    where: {},
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
});
