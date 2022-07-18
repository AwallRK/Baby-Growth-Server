const Controller = require("../controllers/controller");
const MotherController = require("../controllers/motherController");
const motherAuthentication = require("../middlewares/motherAuthentication");

const motherRouter = require("express").Router();

motherRouter.post("/login", MotherController.login);

motherRouter.use(motherAuthentication);

motherRouter.get("/tes", MotherController.tes);

module.exports = motherRouter;
