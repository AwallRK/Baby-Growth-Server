const Controller = require("../controllers/controller");
const UserController = require("../controllers/usercontroller");
const authentication = require("../middlewares/authentication");
const authorizationAdmin = require("../middlewares/authorizationAdmin");
const authorizationSuperAdmin = require("../middlewares/authorizationSuperAdmin");
const motherRouter = require("./routerMother");

const router = require("express").Router();

router.post("/login", Controller.loginUser);
router.use("/mother", motherRouter);
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
router.get("/listMotherProfile/:noRT", Controller.fetchMotherProfileByNoRT);
//
router.get("/motherProfile", Controller.fetchMotherProfiles); // fetch all mother profile by rt (dari UserId dari req.user) untuk select dropdown di create pregnancy form
router.get("/motherProfile/:id", Controller.fetchOneMotherProfile);
router.get("/detailpregnancy/:id", Controller.fetchPregnancyData); // data untuk bar chart (id = pregnancyId)

router.get("/babyWeigthCategories", Controller.babyWeightCategories); // untuk pie chart
router.get("/babyWeigthCategories/:noRT", Controller.babyWeightCategoriesByRT); // untuk pie chart
router.get("/RTStatus", Controller.getAllRTStatus); // untuk pie chart
//

router.post("/registerPregnancy", Controller.createPregnancy);

// form pregnancy data
router.get(
  "/pregnancyData/:pregnancyDataId",
  Controller.fetchPregnancyDataDetail
);
router.post("/registerPregnancyData", Controller.createPregnancyData); // create pregnancydata
router.put("/pregnancyData/:pregnancyDataId", Controller.updatePregnancyData); // update pregnancydata

// form baby data
router.get("/babyData/:babyDataId", Controller.fetchBabyDataDetail);
router.post("/registerBabyData", Controller.createBabyData); // create pregnancydata
router.put("/babyData/:babyDataId", Controller.updateBabyData); // update pregnancydata
// router.post("/inputBabyData", Controller.inputBabyData);

module.exports = router;
