const authorizationAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "Admin" && role !== "SuperAdmin") {
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

module.exports = authorizationAdmin;
