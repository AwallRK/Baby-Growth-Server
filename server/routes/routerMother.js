const Controller = require("../controllers/controller");
const MotherController = require("../controllers/motherController");
const motherAuthentication = require("../middlewares/motherAuthentication");

const motherRouter = require("express").Router();

motherRouter.post("/login", MotherController.login);

motherRouter.use(motherAuthentication);

motherRouter.get("/tes", MotherController.tes);

router.get("/category", UserController.fetchCategory);
router.post("/category", UserController.addCategory);
router.get("/category/:id/article", UserController.fetchArticleBasedOnCategory);
router.post("/category/:id/article", UserController.addArticlesBasedOnCategory);
// router.get("/article/:id", UserController.fetchArticle);
router.post("/nik", Controller.fetchMotherProfileByNIK); //Old login without password
router.post("/pregnancy", Controller.fetchMotherPregnancyByNIK);

module.exports = motherRouter;
