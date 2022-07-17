const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const authorizationAdmin = require("../middlewares/authorizationAdmin");
const authorizationSuperAdmin = require("../middlewares/authorizationSuperAdmin");

const router = require("express").Router();

router.post("/login", Controller.loginUser);

router.use(authentication);
//
router.post("/registerUser", authorizationSuperAdmin, Controller.registerUser);
router.post(
  "/registerMotherProfile",
  authorizationAdmin,
  Controller.registerMotherProfile
);
router.post("/registerPregnancy", Controller.createPregnancy);
router.post("/registerPregnancyData", Controller.createPregnancyData);
router.get("/motherProfile", Controller.fetchMotherProfiles);
router.get("/motherProfile/:id", Controller.fetchOneMotherProfile);
router.get("/detailpregnancy/:id", Controller.fetchPregnancyData);
router.post("/inputBabyData", Controller.inputBabyData);
router.get("/babyWeigthCategories", Controller.babyWeightCategories);
router.get("/babyWeigthCategories/:noRT", Controller.babyWeightCategoriesByRT);
module.exports = router;
