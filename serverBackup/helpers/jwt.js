var jwt = require("jsonwebtoken");

function signToken(payload) {
  return jwt.sign(payload, "qwerty");
}

function verifyToken(token) {
  return jwt.verify(token, "qwerty");
}

module.exports = { signToken, verifyToken };
