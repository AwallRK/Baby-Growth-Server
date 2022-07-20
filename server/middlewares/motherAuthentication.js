const { verifyToken } = require("../helpers/jwt");
const { MotherProfile } = require("../models");

const motherAuthentication = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token;
    // console.log("masok <<<<<<<<<<<<<<<<<<<");
    // console.log(access_token);
    if (!access_token) {
      throw { name: "InvalidToken" };
    }

    const payload = verifyToken(access_token);
    // console.log(payload);
    const foundMother = await MotherProfile.findOne({
      where: {
        id: payload.id,
      },
    });
    // console.log(foundUser);
    if (!foundMother) {
      throw { name: "InvalidToken" };
    }
    req.user = {
      id: payload.id,
      NIK: payload.NIK,
    };
    // console.log(payload.id);
    next();
  } catch (err) {
    if (err.name == "InvalidToken" || err.name == "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json(err);
    }
  }
};

module.exports = motherAuthentication;
