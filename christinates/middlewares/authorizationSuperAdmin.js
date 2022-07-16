const authorizationSuperAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "SuperAdmin") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    if (err.name == "Forbidden") {
      res.status(403).json({ message: "Forbidden" });
    } else {
      res.status(500).json(err);
    }
  }
};

module.exports = authorizationSuperAdmin;
