const Controller = require("../controllers/controller");

const router = require("express").Router();

router.get("/detailpregnancy/:id", Controller.fetchPregnancyData);

module.exports = router;
