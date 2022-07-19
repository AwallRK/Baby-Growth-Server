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
    await User.bulkCreate(users);
    await MotherProfile.bulkCreate(mothers);
    await Pregnancy.bulkCreate(pregnancies);
    await PregnancyData.bulkCreate(pregnancyData);
    await BabyData.bulkCreate(babyData);
    access_token = signToken({
      id: 1,
      role: "admin",
    });
  } catch (err) {
    console.log(err, `before all error!`);
  }
});
// post /login (done)
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

// post /registerUser

// post /registerMotherProfile
// get /listUser
// get /listMotherProfile
// get /listMotherProfile/:noRT
// get /motherProfile
// get /motherProfile/:id
// get /detailpregnancy/:id
// get /babyWeigthCategories
// get /babyWeigthCategories/:noRT
// get /RTStatus"
// post /registerPregnancy
// get /pregnancyData/:pregnancyDataId
// post /registerPregnancyData
// put /pregnancyData/:pregnancyDataId
// get /babyData/:babyDataId
// post /registerBabyData
// put /babyData/:babyDataId

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
