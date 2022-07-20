const { babiesWeightConverter } = require("../helpers/babyWeight");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { selisihCalculator } = require("../helpers/selisihCalculator");
const { calculateStatistics } = require("../helpers/statisticCalculator");
const {
  User,
  MotherProfile,
  Pregnancy,
  PregnancyData,
  BabyData,
} = require("../models");

class MotherController {
  static async login(req, res, next) {
    try {
      const { NIK, password } = req.body;
      if (!NIK) {
        throw { name: "NIKRequired" };
      }
      if (!password) {
        throw { name: "PasswordRequired" };
      }

      const foundMotherProfile = await MotherProfile.findOne({
        where: { NIK },
      });

      if (!foundMotherProfile) {
        throw { name: "InvalidLogin" };
      }

      const isMatched = comparePassword(password, foundMotherProfile.password);

      if (!isMatched) {
        throw { name: "InvalidLogin" };
      }

      const payload = {
        id: foundMotherProfile.id,
        NIK: foundMotherProfile.NIK,
      };
      console.log(payload);

      const access_token = signToken(payload);

      res.status(200).json({
        access_token,
        NIK: foundMotherProfile.NIK,
        name: foundMotherProfile.name,
        address: foundMotherProfile.address,
      });
    } catch (err) {
      next(err);
    }
  }
  static async fetchMotherProfileByNIK(req, res, next) {
    // res.send("masok");
    try {
      const { nik } = req.body;
      if (!nik) {
        throw new Error({ message: "NIK is required!" });
      }
      const data = await MotherProfile.findOne({
        where: {
          NIK: nik,
        },
        include: [Pregnancy],
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async fetchMotherPregnancyByNIK(req, res, next) {
    // res.send("masok");
    try {
      const { nik } = req.body;
      if (!nik) {
        throw new Error({ message: "You must include a NIK" });
      }
      const data = await MotherProfile.findOne({
        where: {
          NIK: nik,
        },
      });

      const pregnancy = await Pregnancy.findAll({
        where: {
          MotherProfileId: data.id,
        },
        include: [PregnancyData],
      });

      res.status(200).json(pregnancy);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MotherController;
