const express = require("express");
const router = require("./routes");
const app = express();
const port = 3001;

const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(router);
app.use(errorHandler);
module.exports = app;
