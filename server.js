const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const { requestRouting } = require("./routing/routing");
const { getInfoLog, getErrorLog } = require("./utils/logger");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(getInfoLog(req.method, req.url));
  next();
});

app.use("/", (req, res, next) => {
  if (req.url === "/") {
    return res.sendFile(path.join(__dirname, "views", "home.html"));
  }
  next();
});

app.use("/product", (req, res, next) => {
  return requestRouting(req, res);
});

app.use("/logout", (req, res, next) => {
  return res.sendFile(path.join(__dirname, "views", "logout.html"));
});

app.use("/kill", (req, res, next) => {
  console.log("Process terminating...");
  process.exit();
});

app.use((req, res) => {
  console.log(getErrorLog(req.url));
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});
