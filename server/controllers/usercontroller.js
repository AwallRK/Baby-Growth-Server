const {
  User,
  MotherProfile,
  Pregnancy,
  PregnancyData,
  BabyData,
  RT,
  Article,
  Category,
  NeedCheck,
} = require("../models");

class UserController {
  static async fetchArticle(req, res) {
    // res.send("masok");
    try {
      const { id } = req.params;

      const data = await Article.findOne({
        where: {
          id,
        },
        include: [Category],
      });

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async fetchCategory(req, res) {
    // res.send("masok");
    try {
      const data = await Category.findAll();

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async fetchArticleBasedOnCategory(req, res) {
    // res.send("masok");
    try {
      const { id } = req.params;

      const data = await Article.findAll({
        where: {
          CategoryId: id,
        },
      });

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async addArticlesBasedOnCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, text, imageUrl } = req.body;
      const data = await Article.create({
        name,
        text,
        imageUrl,
        CategoryId: id,
        IdUser: 1,
      });

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async addCategory(req, res) {
    // res.send("masok");

    try {
      let { name, imageUrl } = req.body;

      const category = await Category.create({ names: name, imageUrl });
      res.status(201).json(category);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;
