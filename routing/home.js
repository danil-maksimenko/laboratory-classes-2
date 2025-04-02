// 🏗 Structo the Builder
// Do wysłania pliku możesz wykorzystać, response.sendFile(path.join(__dirname, "../views", "home.html"));

const path = require("path");

const homeRouting = (method, response) => {
  response.sendFile(path.join(__dirname, "../views", "home.html"));
};

module.exports = { homeRouting };

// const homeRouting = (method, response) => {
//   response.setHeader("Content-Type", "text/html");
//   response.write("<html>");
//   response.write("<head><title>Shop - Home</title></head>");
//   response.write("<body>");
//   response.write("<h1>Home</h1>");
//   response.write(
//     "<nav><a href='/product/add'>Add product</a><br /><a href='/product/new'>Newest product</a><br /><a href='/logout'>Logout</a></nav>"
//   );
//   response.write("</body>");
//   response.write("</html>");

//   return response.end();
// };

// module.exports = { homeRouting };
