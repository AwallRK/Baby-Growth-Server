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
  Category,
  Article,
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
    await Category.bulkCreate(require("../data/category.json"));
    await Article.bulkCreate(require("../data/article.json"));

    access_token = signToken({
      id: 99,
      role: "SuperAdmin",
    });
  } catch (err) {}
});

const user1 = {
  NIK: "222224440000",
  password: "12345",
};
const userNotExist = {
  NIK: "2131",
  password: "12345",
};
const wrongpassword = {
  NIK: "222224440000",
  password: "2515141",
};
const newCategory = {
  name: "test4",
  imageUrl: "https://picsum.photos/200",
};
const errCategory = {
  imageUrl: "https://picsum.photos/200",
};
const newArticle = {
  name: "test2",
  text: "impsum lorem",
  imageUrl: "https://picsum.photos/200",
};
const errArticle = {
  text: "impsum lorem",
  imageUrl: "https://picsum.photos/200",
};
const errArticle2 = {
  name: "impsum lorem",
  imageUrl: "https://picsum.photos/200",
};
const errArticle3 = {
  name: "impsum lorem",
  text: "https://picsum.photos/200",
};
const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiTklLIjoiMjIyMjIzMjQ0MjkxMTEiLCJpYXQiOjE2NTgyMjYyNTN9.iB-Bwycc-Ek4quKKgZMJ7OrsGa-t4NNyZPrdbOz_Vfw";
// post /mother/login (done)
const tokenMother =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiTklLIjoiMjIyMjI0NDQwMDAwIiwiaWF0IjoxNjU4MjU4MTYyfQ.XmMHG2vjwzl2dy8mTvfaWBobTFjyDIIAs1wmI78ln6U";

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
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("400 Login - should return error req nik", (done) => {
    request(app)
      .post("/mother/login")
      .send({ password: user1.password })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("400 Login - should return error wrong password", (done) => {
    request(app)
      .post("/mother/login")
      .send(wrongpassword)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(401);
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
describe("Get Category test", () => {
  test("Get All Category", (done) => {
    request(app)
      .get("/mother/category")
      .end(function (err, res) {
        expect(res.status).toBe(200);
        expect(res.body[0]).toHaveProperty("names");
        expect(res.body[0]).toHaveProperty("imageUrl");
        done();
      });
  });
});

// post /mother/category
describe("Post Category", () => {
  test("201 Success Create new Category", (done) => {
    request(app)
      .post("/mother/category")
      .send(newCategory)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(201);
        expect(res.body).toHaveProperty("names");
        expect(res.body).toHaveProperty("imageUrl");
        done();
      });
  });
  test("500 error when Create new Category", (done) => {
    request(app)
      .post("/mother/category")
      .send(errCategory)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(500);
        expect(res.body).toHaveProperty("name");
        done();
      });
  });
});
// get /mother/category/:id/article
describe("Get Article test", () => {
  test("Get All Article", (done) => {
    request(app)
      .get("/mother/category/1/article")
      .end(function (err, res) {
        expect(res.status).toBe(200);
        expect(res.body[0]).toHaveProperty("name");
        expect(res.body[0]).toHaveProperty("imageUrl");
        done();
      });
  });
  test("500 Error get Article", (done) => {
    request(app)
      .get("/mother/category/''/article")
      .set("access_token", tokenMother)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(500);
        expect(body).toHaveProperty("name", expect.any(String));
        return done();
      });
  });
  test("404 Error get Article", (done) => {
    request(app)
      .get("/mother/category/99/article")
      .set("access_token", tokenMother)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
});

describe("Get one article test", () => {
  test("Get One Article by ID", (done) => {
    request(app)
      .get("/mother/article/1")
      .set("access_token", tokenMother)
      .end(function (err, res) {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("imageUrl");
        done();
      });
  });
  test("401 Error get Article", (done) => {
    request(app)
      .get("/mother/article/99")
      .set("access_token", tokenMother)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
});

// post /mother/category/:id/article
describe("Post Article", () => {
  test("201 Success Create new Article", (done) => {
    request(app)
      .post("/mother/category/1/article")
      .send(newArticle)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(201);
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("imageUrl");
        done();
      });
  });
  test("500 error when Create new Article req name", (done) => {
    request(app)
      .post("/mother/category/1/article")
      .send(errArticle)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(500);
        expect(res.body).toHaveProperty("name");
        done();
      });
  });
  test("500 error when Create new Article req title", (done) => {
    request(app)
      .post("/mother/category/1/article")
      .send(errArticle2)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(500);
        expect(res.body).toHaveProperty("name");
        done();
      });
  });
  test("500 error when Create new Article req imageUrl", (done) => {
    request(app)
      .post("/mother/category/1/article")
      .send(errArticle3)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(500);
        expect(res.body).toHaveProperty("name");
        done();
      });
  });
});
// get /mother/categoryMonth/:id
describe("Get Article test", () => {
  test("Get All Article with mounth pregnancy", (done) => {
    request(app)
      .get("/mother/categoryMonth/1")
      .end(function (err, res) {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("names");
        expect(res.body).toHaveProperty("imageUrl");
        expect(res.body).toHaveProperty("Articles");
        done();
      });
  });
  test("404 Error get Article", (done) => {
    request(app)
      .get("/mother/categoryMonth/99")
      .set("access_token", tokenMother)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
});
// post /mother/categoryMonth/:id
describe("Post Article", () => {
  test("201 Success Create new article with mounth pregnancy", (done) => {
    request(app)
      .post("/mother/categoryMonth/1")
      .send(newArticle)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(201);
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("imageUrl");
        done();
      });
  });
  test("500 error when Create new article with mounth pregnancy", (done) => {
    request(app)
      .post("/mother/categoryMonth/1")
      .send(errArticle)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(500);
        expect(res.body).toHaveProperty("name");
        done();
      });
  });
});
// get /mother/nik
describe("Get Mother Pregnancy test", () => {
  test("Get detail mother profile", (done) => {
    request(app)
      .get("/mother/nik")
      .send({ nik: "222224440000" })
      .set("access_token", tokenMother)
      .end(function (err, res) {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("NIK");
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("Pregnancies");
        done();
      });
  });
  test("Returns forbidden if access token inappropriate", (done) => {
    request(app)
      .get("/mother/pregnancy")
      .send({ nik: "222224440000" })
      .set("access_token", { payload: "swsnjswjjn" })
      .end(function (err, res) {
        expect(res.status).toBe(401);
        done();
      });
  });
  test("return not found when theres no nik", (done) => {
    request(app)
      .get("/mother/nik")
      .send({ nik: "1" })
      .set("access_token", tokenMother)
      .end(function (err, res) {
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", expect.any(String));
        done();
      });
});
test("return not found when theres no nik", (done) => {
  request(app)
    .get("/mother/nik")
    .send({})
    .set("access_token", tokenMother)
    .end(function (err, res) {
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", expect.any(String));
      done();
    });
});
})
// get /mother/pregnancy
describe("Get Mother Pregnancy test", () => {
  test("Get detail mother pregnancy", (done) => {
    request(app)
      .get("/mother/pregnancy")
      .send({ nik: "222723440002" })
      .set("access_token", tokenMother)
      .end(function (err, res) {
        expect(res.status).toBe(200);
        expect(res.body[0]).toHaveProperty("name");
        expect(res.body[0]).toHaveProperty("sudahLahir");
        expect(res.body[0]).toHaveProperty("PregnancyDatum");
        done();
      });
  });
  test("Returns unauthorized if access token inappropriate", (done) => {
    request(app)
      .get("/mother/pregnancy")
      .send({ nik: "222723440002" })
      .set("access_token", { payload: "swsnjswjjn" })
      .end(function (err, res) {
        expect(res.status).toBe(401);
        done();
      });
  });
  test("return not found when theres no nik", (done) => {
    request(app)
      .get("/mother/pregnancy")
      .send({ nik: "1" })
      .set("access_token", tokenMother)
      .end(function (err, res) {
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", expect.any(String));
        done();
      });
});
test("return not found when theres no nik", (done) => {
  request(app)
    .get("/mother/pregnancy")
    .send({})
    .set("access_token", tokenMother)
    .end(function (err, res) {
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", expect.any(String));
      done();
    });
});
});

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
  await Category.destroy({
    where: {},
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  await Article.destroy({
    where: {},
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
});
