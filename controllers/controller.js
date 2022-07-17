const {
  User,
  MotherProfile,
  Pregnancy,
  PregnancyData,
  BabyData,
} = require("../models");

class Controller {
  static async fetchPregnancyData(req, res) {
    // res.send("masok");
    try {
      const { id } = req.params;

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

      console.log(tempSelisihArr);
      //   data.PregnancyDatum.selisihBulanan = tempSelisihArr;
      //   console.log(data);

      res.status(200).json({ data, tempSelisihArr });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async fetchMotherProfileByNIK(req, res) {
    // res.send("masok");
    try {
      const { NIK } = req.body;

      const data = await MotherProfile.findOne({
        where: {
          NIK:NIK,
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

      const data = await MotherProfile.findOne({
        where: {
          NIK:nik,
        },
      });
      
      const pregnancy = await Pregnancy.findAll({
        where:{
          MotherProfileId:data.id,
          
        },
        include: [PregnancyData]
      })

      res.status(200).json(pregnancy);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;
