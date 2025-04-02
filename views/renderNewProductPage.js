/* 🏗 Structo the Builder */
/* Funkcja generująca stronę HTML z najnowszym produktem */
const renderNewProductPage = (response, productData) => {
  response.setHeader("Content-Type", "text/html");
  response.write("<html>");
  response.write("<head><title>Shop - Newest product</title></head>");
  response.write("<body>");
  response.write("<h1>Newest product</h1>");
  response.write(
    "<nav><a href='/'>Home</a><br /><a href='/product/add'>Add product</a><br /><a href='/logout'>Logout</a></nav>"
  );

  if (!productData) {
    response.write("<br /><div>No new products available.</div>");
  } else {
    response.write(`<br /><div>New product data - ${productData}</div>`);
  }

  response.write("</body>");
  response.write("</html>");

  return response.end();
};

module.exports = renderNewProductPage;
