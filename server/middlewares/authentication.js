const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token;
    // console.log("masok <<<<<<<<<<<<<<<<<<<");
    // console.log(access_token);
    if (!access_token) {
      throw { name: "InvalidToken" };
    }

    const payload = verifyToken(access_token);
    // console.log(payload);
    const foundUser = await User.findOne({
      where: {
        id: payload.id,
      },
    });
    // console.log(foundUser);
    if (!foundUser) {
      throw { name: "InvalidToken" };
    }
    req.user = {
      id: payload.id,
      role: payload.role,
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

module.exports = authentication;
