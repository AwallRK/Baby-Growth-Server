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

class Controller {
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "EmailRequired" };
      }
      if (!password) {
        throw { name: "PasswordRequired" };
      }

      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!foundUser) {
        throw { name: "InvalidLogin" };
      }

      const isMatched = comparePassword(password, foundUser.password);

      if (!isMatched) {
        throw { name: "InvalidLogin" };
      }

      const payload = {
        id: foundUser.id,
        role: foundUser.role,
      };

      console.log(payload);

      const access_token = signToken(payload);
      res.status(200).json({ access_token, role: foundUser.role });
    } catch (err) {
      if (err.name == "PasswordRequired") {
        res.status(400).json({ message: "Password is required" });
      } else if (err.name == "EmailRequired") {
        res.status(400).json({ message: "Email is required" });
      } else if (err.name == "InvalidLogin") {
        res.status(401).json({ message: "Invalid email/password" });
      } else {
        res.status(500).json(err);
      }
    }
  }

  static async registerUser(req, res) {
    try {
      const role = "Admin";
      const { username, password, email, noRT } = req.body;

      const createdUser = await User.create({
        username,
        password: hashPassword(password),
        email,
        noRT,
        role,
      });

      res.status(201).json({
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username,
        noRT: createdUser.noRT,
      });
    } catch (err) {
      if (
        err.name == "SequelizeUniqueConstraintError" ||
        err.name == "SequelizeValidationError"
      ) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json(err);
      }
    }
  }

  static async registerMotherProfile(req, res) {
    try {
      const UserId = req.user.id;
      const { name, NIK, password, address } = req.body;

      const createdMotherProfile = await MotherProfile.create({
        UserId,
        name,
        NIK,
        password: hashPassword(password),
        address,
      });

      res.status(201).json({
        id: createdMotherProfile.id,
        name: createdMotherProfile.name,
        NIK: createdMotherProfile.NIK,
        address: createdMotherProfile.address,
      });
    } catch (err) {
      if (
        err.name == "SequelizeUniqueConstraintError" ||
        err.name == "SequelizeValidationError"
      ) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json(err);
      }
    }
  }

  static async fetchUserList(req, res) {
    try {
      const listUser = await User.findAll({
        where: {
          role: "Admin",
        },
        attributes: {
          exclude: ["password"],
        },
        order: ["id"],
      });

      res.status(200).json(listUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async fetchMotherProfileList(req, res) {
    try {
      const listMother = await MotherProfile.findAll({
        attributes: {
          exclude: ["password"],
        },
        order: ["id"],
      });

      res.status(200).json(listMother);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async fetchMotherProfileByNoRT(req, res) {
    try {
      const { noRT } = req.params;
      console.log("masok");
      console.log(noRT);

      const foundUser = await User.findOne({
        where: { noRT },
        attributes: { exclude: ["password"] },
        include: { model: MotherProfile, include: Pregnancy },
      });

      let data = [];
      if (foundUser) {
        data = foundUser.MotherProfiles;
      }

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async fetchMotherProfiles(req, res) {
    try {
      // const UserId = req.query.UserId
      const UserId = req.user.id;

      let options = {
        order: ["id"],
        attributes: {
          exclude: ["password"],
        },
        // include: [
        //   {
        //     model: Pregnancy,
        //     include: [PregnancyData, BabyData],
        //   },
        // ],

        include: [
          {
            model: Pregnancy,
          },
        ],
      };

      options.where = { UserId: UserId };
      const motherList = await MotherProfile.findAll(options);
      // console.log(motherList);
      res.status(200).json(motherList);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async fetchOneMotherProfile(req, res) {
    try {
      // const UserId = req.query.UserId
      const UserId = req.user.id;
      const MotherId = req.params.id;
      let options = {
        order: ["id"],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Pregnancy,
            include: [PregnancyData, BabyData],
          },
        ],
      };

      options.where = { UserId: UserId, id: MotherId };
      const motherList = await MotherProfile.findAll(options);
      res.status(200).json(motherList);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async createPregnancy(req, res) {
    try {
      const { MotherProfileId, name, sudahLahir } = req.body;
      const createdPregnancy = await Pregnancy.create({
        MotherProfileId,
        name,
        sudahLahir,
      });
      res.status(200).json(createdPregnancy);
    } catch (err) {
      if (
        err.name == "SequelizeUniqueConstraintError" ||
        err.name == "SequelizeValidationError"
      ) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json(err);
      }
    }
  }

  static async createPregnancyData(req, res) {
    try {
      const { PregnancyId, beratAwal, beratBulanan } = req.body;
      const tanggalDicatat = new Date();

      const createdPregnancyData = await PregnancyData.create({
        PregnancyId,
        beratAwal,
        beratBulanan,
        tanggalDicatat,
      });

      res.status(200).json(createdPregnancyData);
    } catch (err) {
      if (
        err.name == "SequelizeUniqueConstraintError" ||
        err.name == "SequelizeValidationError"
      ) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json(err);
      }
    }
  }

  static async inputPregnancyData(req, res) {
    try {
      const { PregnancyId, beratAwal, beratBulanan } = req.body;
      const tanggalDicatat = new Date();
      let updatedOrCreatedPregnancyData = {};
      const foundPregnancy = await PregnancyData.findOne({
        where: {
          PregnancyId,
        },
      });
      if (foundPregnancy) {
        const foundId = foundPregnancy.id;
        const updatedData = await PregnancyData.update(
          {
            beratAwal,
            beratBulanan,
            tanggalDicatat,
          },
          { where: { id: foundId }, returning: true }
        );
        updatedOrCreatedPregnancyData = updatedData[1][0];
      } else {
        updatedOrCreatedPregnancyData = await PregnancyData.create({
          PregnancyId,
          beratAwal,
          beratBulanan,
          tanggalDicatat,
        });
      }

      res.status(200).json(updatedOrCreatedPregnancyData);
    } catch (err) {
      if (
        err.name == "SequelizeUniqueConstraintError" ||
        err.name == "SequelizeValidationError"
      ) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json(err);
      }
    }
    // try {
    //   const { PregnancyId, beratAwal, beratBulanan } = req.body;
    //   const tanggalDicatat = new Date();

    //   const createdPregnancyData = await PregnancyData.create({
    //     PregnancyId,
    //     beratAwal,
    //     beratBulanan,
    //     tanggalDicatat,
    //   });

    //   res.status(200).json(createdPregnancyData);
    // } catch (err) {
    //   if (
    //     err.name == "SequelizeUniqueConstraintError" ||
    //     err.name == "SequelizeValidationError"
    //   ) {
    //     res.status(400).json({ message: err.errors[0].message });
    //   } else {
    //     res.status(500).json(err);
    //   }
    // }
  }

  static async inputBabyData(req, res) {
    try {
      const { PregnancyId, beratAwal, beratBulanan } = req.body;
      const tanggalDicatat = new Date();
      let updatedOrCreatedBabyData = {};
      const foundBaby = await BabyData.findOne({
        where: {
          PregnancyId,
        },
      });
      if (foundBaby) {
        const foundId = foundBaby.id;
        const updatedData = await BabyData.update(
          {
            beratAwal,
            beratBulanan,
            tanggalDicatat,
          },
          { where: { id: foundId }, returning: true }
        );
        updatedOrCreatedBabyData = updatedData[1][0];
      } else {
        updatedOrCreatedBabyData = await BabyData.create({
          PregnancyId,
          beratAwal,
          beratBulanan,
          tanggalDicatat,
        });
      }

      res.status(200).json(updatedOrCreatedBabyData);
    } catch (err) {
      if (
        err.name == "SequelizeUniqueConstraintError" ||
        err.name == "SequelizeValidationError"
      ) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json(err);
      }
    }
  }
  static async fetchPregnancyData(req, res) {
    // res.send("masok");
    try {
      const { id } = req.params;
      // console.log("masok <<<<<<<<");
      // console.log(req.user);

      const data = await Pregnancy.findOne({
        where: {
          id,
        },
        include: [
          PregnancyData,
          BabyData,
          {
            model: MotherProfile,
            attributes: { exclude: ["password"] },
            include: { model: User, attributes: { exclude: ["password"] } },
          },
        ],
      });
      const [selisihBulananHamil, selisihBulananBayi] = selisihCalculator(data);
      res.status(200).json({
        selisihBulananHamil,
        selisihBulananBayi,
        data,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async babyWeightCategories(req, res, next) {
    try {
      let motherCount = 0;
      const babiesWeight = [];
      const categoriesPerRT = [];
      let options = {
        order: ["id"],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: MotherProfile,
            include: { model: Pregnancy, include: [PregnancyData, BabyData] },
          },
        ],
      };
      const users = await User.findAll(options);
      users.forEach((user) => {
        if (user.noRT === 99) {
          return;
        }
        const motherList = user.MotherProfiles;
        const babiesDalamSatuRTWeight = [];
        motherList.forEach((mother) => {
          mother.Pregnancies.forEach((pregnancy) => {
            if (pregnancy.sudahLahir) {
              const [_, selisihBulananBayi] = selisihCalculator(pregnancy);
              babiesWeight.push(selisihBulananBayi);
              babiesDalamSatuRTWeight.push(selisihBulananBayi);
            } else {
              motherCount++;
            }
          });
        });
        const categoriesDalamRT = babiesWeightConverter(
          babiesDalamSatuRTWeight
        );
        categoriesPerRT.push({
          noRT: user.noRT,
          categories: categoriesDalamRT,
        });
      });

      const statistic = calculateStatistics(categoriesPerRT);
      const categories = babiesWeightConverter(babiesWeight);
      res.status(200).json({
        categories,
        ibuBelumMelahirkan: motherCount,
        statistic,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async babyWeightCategoriesByRT(req, res, next) {
    try {
      let noRT = req.params.noRT;
      let motherCount = 0;
      let options = {
        order: ["id"],
        attributes: {
          exclude: ["password"],
        },
        where: { noRT },
        include: [
          {
            model: MotherProfile,
            include: { model: Pregnancy, include: [PregnancyData, BabyData] },
          },
        ],
      };
      const user = await User.findOne(options);
      const motherList = user.MotherProfiles;
      const babiesWeight = [];
      motherList.forEach((mother) => {
        mother.Pregnancies.forEach((pregnancy) => {
          if (pregnancy.sudahLahir) {
            const [_, selisihBulananBayi] = selisihCalculator(pregnancy);
            babiesWeight.push(selisihBulananBayi);
          } else {
            motherCount++;
          }
        });
      });
      const categories = babiesWeightConverter(babiesWeight);
      res.status(200).json({ categories, ibuBelumMelahirkan: motherCount });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getAllRTStatus(req, res, next) {
    try {
      const babiesWeight = [];
      const categoriesPerRT = [];
      let options = {
        order: ["id"],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: MotherProfile,
            include: { model: Pregnancy, include: [PregnancyData, BabyData] },
          },
        ],
      };
      const users = await User.findAll(options);
      users.forEach((user) => {
        if (user.noRT === 99) {
          return;
        }
        const motherList = user.MotherProfiles;
        const babiesDalamSatuRTWeight = [];
        motherList.forEach((mother) => {
          mother.Pregnancies.forEach((pregnancy) => {
            if (pregnancy.sudahLahir) {
              const [_, selisihBulananBayi] = selisihCalculator(pregnancy);
              babiesWeight.push(selisihBulananBayi);
              babiesDalamSatuRTWeight.push(selisihBulananBayi);
            }
          });
        });
        const categoriesDalamRT = babiesWeightConverter(
          babiesDalamSatuRTWeight
        );
        categoriesPerRT.push({
          noRT: user.noRT,
          categories: categoriesDalamRT,
        });
      });

      const RTList = [];
      categoriesPerRT.forEach((rt) => {
        if (rt.categories.kurang > 0 && rt.categories.kurang <= 5) {
          rt.status = "Warning";
          RTList.push({ noRT: rt.noRT, status: rt.status });
        } else if (rt.categories.kurang > 5) {
          rt.status = "Critical";
          RTList.push({ noRT: rt.noRT, status: rt.status });
        }
      });

      res.status(200).json(RTList);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async fetchMotherProfileByNIK(req, res) {
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
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async fetchMotherPregnancyByNIK(req, res) {
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
        include: [PregnancyData,BabyData],
      });

      res.status(200).json(pregnancy);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;
