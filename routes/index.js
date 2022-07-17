const Controller = require("../controllers/controller");
const UserController = require("../controllers/usercontroller");

const router = require("express").Router();

router.get("/detailpregnancy/:id", Controller.fetchPregnancyData);
router.get("/category", UserController.fetchCategory);
router.post("/category", UserController.addCategory);
router.get("/category/:id/article", UserController.fetchArticleBasedOnCategory);
router.post("/category/:id/article", UserController.addArticlesBasedOnCategory);
// router.get("/article/:id", UserController.fetchArticle);
router.post("/nik", Controller.fetchMotherProfileByNIK);
router.post("/pregnancy", Controller.fetchMotherPregnancyByNIK);


module.exports = router;
