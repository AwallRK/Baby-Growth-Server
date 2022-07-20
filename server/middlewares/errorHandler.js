function errorHandler(err, req, res, next) {
  if (err.name == "PasswordRequired") {
    res.status(400).json({ message: "Password is required" });
  } else if (err.name == "EmailRequired") {
    res.status(400).json({ message: "Email is required" });
  } else if (err.name == "InvalidLogin") {
    res.status(401).json({ message: "Invalid email/password" });
  } else if (err.name == "NotFound") {
    res.status(404).json({ message: "Data not found" });
  } else if (
    err.name == "SequelizeUniqueConstraintError" ||
    err.name == "SequelizeValidationError"
  ) {
    res.status(400).json({ message: err.errors[0].message });
  } else if (err.name === "Inappropriate Input!") {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json(err);
  }
}

module.exports = errorHandler;
