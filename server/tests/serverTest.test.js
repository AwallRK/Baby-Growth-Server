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
let RT_access_token = "";
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
      role: "SuperAdmin",
    });
    RT_access_token = signToken({
      id: 2,
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
  test("Returns appropriate response if credentials don't match", async () => {
    const response = await request(app).post("/login").send({
      email: "superadmin@mail.com",
      password: "test",
    });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: "Invalid email/password" });
  });
});

// post /registerUser
describe("Tests the register user path", () => {
  test("Returns new user details and status for created", async () => {
    const response = await request(app)
      .post("/registerUser")
      .set({ access_token })
      .send({
        email: "tabby@mail.com",
        username: "Pak Karto",
        noRT: 95,
        password: "12345",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      email: "tabby@mail.com",
      username: "Pak Karto",
      noRT: 95,
    });
  });
  test("Register returns appropriate response for an empty request", async () => {
    const response = await request(app)
      .post("/registerUser")
      .set({ access_token });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Password cannot be blank" });
  });
});

// post /registerMotherProfile
describe("Tests the register mother path", () => {
  test("Returns new mother details and status for created", async () => {
    const response = await request(app)
      .post("/registerMotherProfile")
      .set({ access_token })
      .send({
        UserId: "2",
        name: "sucontoh",
        NIK: "222312389137892891028",
        password: "12345",
        address: "Jalan lima ratus",
        latitude: 0,
        longitude: 0,
      });
    console.log(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      name: "sucontoh",
      NIK: "222312389137892891028",
      address: "Jalan lima ratus",
    });
  });
  test("Register mother returns appropriate response for an empty request", async () => {
    const response = await request(app)
      .post("/registerMotherProfile")
      .set({ access_token });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Password cannot be blank" });
  });
});

// get /listUser
describe("Tests the list user path", () => {
  test("Returns user list and status for ok", async () => {
    const response = await request(app).get("/listUser").set({ access_token });
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toEqual({
      id: 2,
      username: "Pak Karto",
      email: "karto@mail.com",
      role: "Admin",
      noRT: 1,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
  test("Returns unauthorized if access token not provided", async () => {
    const response = await request(app).get("/listUser");
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: "Invalid token" });
  });
});
// get /listMotherProfile
describe("Tests the list mother profiles path", () => {
  test("Returns mothers list and status for ok", async () => {
    const response = await request(app)
      .get("/listMotherProfile")
      .set({ access_token });
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toEqual({
      id: 1,
      name: "Sutijah",
      NIK: "222224440000",
      address: "Jl. Dua Ribu",
      UserId: 2,
      latitude: "-5.794452",
      longitude: "106.484141",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
  test("Returns unauthorized if access token not provided", async () => {
    const response = await request(app).get("/listMotherProfile");
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: "Invalid token" });
  });
});
// get /listMotherProfile/:noRT
describe("Tests list mother profiles per RT path", () => {
  test("Returns mothers list for RT 1 and status for ok", async () => {
    const response = await request(app)
      .get("/listMotherProfile/1")
      .set({ access_token });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: "Sutijah",
          NIK: "222224440000",
          address: "Jl. Dua Ribu",
          UserId: 2,
          latitude: "-5.794452",
          longitude: "106.484141",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ])
    );
    expect(response.body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Sundamin",
          NIK: "222224440221",
          password: "12345",
          address: "Jl. Sembilan Ribu",
          UserId: 3,
          latitude: -5.655742,
          longitude: 106.566803,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ])
    );
  });
  test("Returns unauthorized if access token not provided", async () => {
    const response = await request(app).get("/listMotherProfile");
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: "Invalid token" });
  });
});
// get /motherProfile
describe("Tests list mother profiles created by user path", () => {
  test("Returns mothers list for SuperAdmin and status for ok", async () => {
    const response = await request(app)
      .get("/listMotherProfile/1")
      .set({ access_token });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: "Sutijah",
          NIK: "222224440000",
          address: "Jl. Dua Ribu",
          UserId: 2,
          latitude: "-5.794452",
          longitude: "106.484141",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ])
    );
    expect(response.body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Sundamin",
          NIK: "222224440221",
          password: "12345",
          address: "Jl. Sembilan Ribu",
          UserId: 3,
          latitude: -5.655742,
          longitude: 106.566803,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ])
    );
  });
  test("Returns unauthorized if access token not provided", async () => {
    const response = await request(app).get("/listMotherProfile");
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: "Invalid token" });
  });
});
// get /motherProfile/:id
describe("Get a mother profile", () => {
  test("Returns mother with ID 1 and status for ok", async () => {
    const response = await request(app)
      .get("/motherProfile/1")
      .set({ access_token: RT_access_token });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: "Sutijah",
          NIK: "222224440000",
          address: "Jl. Dua Ribu",
          UserId: 2,
          latitude: "-5.794452",
          longitude: "106.484141",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ])
    );
    expect(response.body).not.toEqual(
      expect.objectContaining({
        name: "Sundamin",
        NIK: "222224440221",
        password: "12345",
        address: "Jl. Sembilan Ribu",
        UserId: 3,
        latitude: -5.655742,
        longitude: 106.566803,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
  });
  test("Returns unauthorized if access token not provided", async () => {
    const response = await request(app).get("/listMotherProfile");
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: "Invalid token" });
  });
});

// get /detailpregnancy/:id
describe("Get detail kehamilan berdasarkan id Ibu", () => {
  test("Returns pregnancy data for mother with ID 1 and status for ok", async () => {
    const response = await request(app)
      .get("/detailpregnancy/1")
      .set({ access_token });
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual(
      expect.objectContaining({
        id: 1,
        MotherProfileId: 1,
        name: "Kehamilan Kedua Bu Sutijah",
        sudahLahir: true,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );

    expect(response.body.selisihBulananBayi).toEqual(expect.any(Array));
    expect(response.body.selisihBulananHamil).toEqual(expect.any(Array));
  });
  test("Returns unauthorized if access token not provided", async () => {
    const response = await request(app).get("/listMotherProfile");
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: "Invalid token" });
  });
});

// get /babyWeigthCategories
describe("Get berat bayi dan statistics", () => {
  test("Returns baby weight categories and status for ok", async () => {
    const response = await request(app)
      .get("/babyWeigthCategories")
      .set({ access_token });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      categories: {
        kurang: expect.any(Number),
        cukup: expect.any(Number),
        berlebih: expect.any(Number),
      },
      ibuBelumMelahirkan: expect.any(Number),
      statistic: {
        giziKurangTerbanyak: {
          noRT: expect.any(Array),
          jumlah: expect.any(Number),
        },
        giziBerlebihTerbanyak: {
          noRT: expect.any(Array),
          jumlah: expect.any(Number),
        },
        giziCukupTerbanyak: {
          noRT: expect.any(Array),
          jumlah: expect.any(Number),
        },
      },
    });
  });
  test("Returns unauthorized if access token not provided", async () => {
    const response = await request(app).get("/listMotherProfile");
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: "Invalid token" });
  });
});

// get /babyWeigthCategories/:noRT
describe("Get berat bayi dan statistics untuk satu RT", () => {
  test("Returns baby weight categories in RT 1 and status for ok", async () => {
    const response = await request(app)
      .get("/babyWeigthCategories/1")
      .set({ access_token });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      categories: {
        kurang: expect.any(Number),
        cukup: expect.any(Number),
        berlebih: expect.any(Number),
      },
      ibuBelumMelahirkan: expect.any(Number),
    });
  });
  test("Returns unauthorized if access token not provided", async () => {
    const response = await request(app).get("/listMotherProfile");
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: "Invalid token" });
  });
});
// get /RTStatus
describe("Get status RT yang berresiko", () => {
  test("Returns RT status and status for ok", async () => {
    const response = await request(app).get("/RTStatus").set({ access_token });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          noRT: expect.any(Number),
          status: "Warning",
        }),
      ])
    );
  });
  test("Returns unauthorized if access token not provided", async () => {
    const response = await request(app).get("/listMotherProfile");
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: "Invalid token" });
  });
});
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
