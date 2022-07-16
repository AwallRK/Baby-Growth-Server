const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const authorizationAdmin = require("../middlewares/authorizationAdmin");
const authorizationSuperAdmin = require("../middlewares/authorizationSuperAdmin");

const router = require("express").Router();

router.post("/login", Controller.loginUser);

router.use(authentication);

router.post("/registerUser", authorizationSuperAdmin, Controller.registerUser);
router.post(
  "/registerMotherProfile",
  authorizationAdmin,
  Controller.registerMotherProfile
);
router.post("/registerPregnancy", Controller.createPregnancy);
router.post("/addOrUpdatePregnancyData", Controller.addOrUpdatePregnancyData);
router.get("/motherProfile", Controller.fetchMotherProfiles);
router.get("/detailpregnancy/:id", Controller.fetchPregnancyData);

module.exports = router;
