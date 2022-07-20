const { Article, Category } = require("../models");

class UserController {
  static async fetchArticle(req, res, next) {
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
      next(err);
    }
  }

  static async fetchCategory(req, res, next) {
    // res.send("masok");
    try {
      const data = await Category.findAll();

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async fetchArticleBasedOnCategory(req, res, next) {
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
      next(err);
    }
  }

  static async fetchArticleBasedOnCategoryMonth(req, res, next) {
    // res.send("masok");
    try {
      const { id } = req.params;
      const category = await Category.findOne({
        where: {
          names: "Bulan " + id,
        },
        include: [Article],
      });

      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async addArticleBasedOnCategoryMonth(req, res, next) {
    // res.send("masok");
    try {
      const { id } = req.params;
      if (!id) {
        throw { name: "Bad Request" };
      }
      const { name, text, imageUrl } = req.body;
      if (!name) {
        throw { name: "name is required" };
      }
      if (!text) {
        throw { name: "name is required" };
      }
      if (!imageUrl) {
        throw { name: "name is required" };
      }
      const category = await Category.findOne({
        where: {
          names: "Bulan " + id,
        },
      });
      const article = await Article.create({
        name: name,
        text,
        imageUrl,
        CategoryId: category.id,
        IdUser: 1,
      });
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }

  static async addArticlesBasedOnCategory(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        throw { name: "Bad Request" };
      }
      const { name, text, imageUrl } = req.body;
      if (!name) {
        throw { name: "name is required" };
      }
      if (!text) {
        throw { name: "name is required" };
      }
      if (!imageUrl) {
        throw { name: "name is required" };
      }
      const data = await Article.create({
        name,
        text,
        imageUrl,
        CategoryId: id,
        IdUser: 1,
      });

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async addCategory(req, res, next) {
    // res.send("masok");

    try {
      let { name, imageUrl } = req.body;
      if (!name) {
        throw { name: "name is Required" };
      }
      if (!imageUrl) {
        throw { name: "imageUrl is Required" };
      }

      const category = await Category.create({ names: name, imageUrl });
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
