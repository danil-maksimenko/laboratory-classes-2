const path = require("path");
const { homeRouting } = require("./home");
const { productRouting } = require("./product");
const { logoutRouting } = require("./logout");
const { STATUS_CODE } = require("../constants/statusCode");
const { getInfoLog, getErrorLog, getProcessLog } = require("../utils/logger");

const requestRouting = (request, response) => {
  const { url, method } = request;
  console.log(getInfoLog(method, url));

  if (url === "/") {
    return homeRouting(method, response);
  }

  if (url.includes("/product")) {
    return productRouting(request, response);
  }

  if (url === "/logout") {
    return logoutRouting(method, response);
  }

  if (url === "/kill") {
    console.log(getProcessLog());
    process.exit();
  }

  response.statusCode = STATUS_CODE.NOT_FOUND;
  response.setHeader("Content-Type", "text/html");
  response.write("<html><body><h1>404 - Not Found</h1></body></html>");
  response.end();

  console.warn(getErrorLog(url));
};

module.exports = { requestRouting };
