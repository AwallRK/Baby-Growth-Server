const Controller = require("../controllers/controller");
const UserController = require("../controllers/usercontroller");
const MotherController = require("../controllers/motherController");
const motherAuthentication = require("../middlewares/motherAuthentication");

const motherRouter = require("express").Router();

motherRouter.post("/login", MotherController.login);
motherRouter.get("/category", UserController.fetchCategory);
motherRouter.post("/category", UserController.addCategory);
motherRouter.get("/category/:id/article", UserController.fetchArticleBasedOnCategory);

motherRouter.post("/category/:id/article", UserController.addArticlesBasedOnCategory);

motherRouter.get("/categoryMonth/:id", UserController.fetchArticleBasedOnCategoryMonth);
motherRouter.post("/categoryMonth/:id", UserController.addArticleBasedOnCategoryMonth);

motherRouter.use(motherAuthentication);

motherRouter.get("/tes", MotherController.tes);


// router.get("/article/:id", UserController.fetchArticle);
motherRouter.get("/nik", MotherController.fetchMotherProfileByNIK); //Old login without password
motherRouter.get("/pregnancy", MotherController.fetchMotherPregnancyByNIK);

module.exports = motherRouter;
