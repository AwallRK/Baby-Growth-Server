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
// fetch list all
router.get("/listUser", Controller.fetchUserList); // fetch all user exclude superAdmin
router.get("/listMotherProfile", Controller.fetchMotherProfileList); // fetch all motherprofile
//
router.get("/motherProfile", Controller.fetchMotherProfiles); // fetch all mother profile by rt (dari UserId dari req.user) untuk select dropdown di create pregnancy form
router.get("/motherProfile/:id", Controller.fetchOneMotherProfile);
router.get("/detailpregnancy/:id", Controller.fetchPregnancyData); // data untuk bar chart (id = pregnancyId)

router.get("/babyWeigthCategories", Controller.babyWeightCategories); // untuk pie chart
router.get("/babyWeigthCategories/:noRT", Controller.babyWeightCategoriesByRT); // untuk pie chart
//

router.post("/registerPregnancy", Controller.createPregnancy);
router.post("/registerPregnancyData", Controller.createPregnancyData);
router.post("/inputBabyData", Controller.inputBabyData);
module.exports = router;
