const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
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
      res.status(200).json({ access_token });
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

  static async fetchMotherProfiles(req, res) {
    try {
      // const UserId = req.query.UserId
      const UserId = req.user.id;

      let options = {
        order: ["id"],
        attributes: {
          exclude: ["password"],
        },
      };

      options.where = { UserId: UserId };
      const motherList = await MotherProfile.findAll(options);
      console.log(motherList);
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

  static async addOrUpdatePregnancyData(req, res) {
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
        include: [PregnancyData, { model: MotherProfile, include: User }],
        // MotherProfile,
      });

      //   console.log(data.PregnancyDatum.beratBulanan);
      const beratBulananArr = data.PregnancyDatum.beratBulanan.split(",");
      //   console.log(beratBulananArr);
      const tempSelisihArr = [];

      tempSelisihArr.push(beratBulananArr[0] - data.PregnancyDatum.beratAwal);

      for (let i = 0; i < beratBulananArr.length - 1; i++) {
        tempSelisihArr.push(beratBulananArr[i + 1] - beratBulananArr[i]);
      }

      // console.log(tempSelisihArr);
      //   data.PregnancyDatum.selisihBulanan = tempSelisihArr;
      //   console.log(data);

      res.status(200).json({ data, selisihBulanan: tempSelisihArr });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;
