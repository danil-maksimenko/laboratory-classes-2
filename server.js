const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const { getInfoLog, getErrorLog } = require("./utils/logger");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log(getInfoLog(req.method, req.url));
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/product/add", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "add-product.html"));
});

app.post("/product/add", (req, res) => {
  const formData = [
    `name: ${req.body.name}`,
    `description: ${req.body.description}`,
  ];

  fs.writeFile("product.txt", `${formData[0]}, ${formData[1]}`, (err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/product/new");
  });
});

app.get("/product/new", (req, res) => {
  fs.readFile("./product.txt", "utf-8", (err, data) => {
    res.setHeader("Content-Type", "text/html");
    res.write(`<!DOCTYPE html>
<html>
<head>
  <title>Shop - Newest product</title>
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
  <div class="container">
    <h1>Newest product</h1>
    <nav>
      <a href='/'>Home</a>
      <a href='/product/add'>Add product</a>
      <a href='/logout'>Logout</a>
    </nav>`);

    if (err) {
      res.write(`<div class="content">
        <p>No new products available.</p>
      </div>`);
    } else {
      res.write(`<div class="content">
        <div class="product-data">
          <strong>New product data:</strong><br>
          ${data}
        </div>
      </div>`);
    }

    res.write(`</div>
</body>
</html>`);

    return res.end();
  });
});

app.get("/logout", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "logout.html"));
});

app.get("/kill", (req, res) => {
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
