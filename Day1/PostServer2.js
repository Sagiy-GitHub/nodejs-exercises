const fs = require("fs");
const http = require("http");

const callServer = (req, resp) => {
  let filePath;
  switch (req.url) {
    case "/":
      filePath = "./ServerPages/index.html";
      break;
    case "/about":
      filePath = "./ServerPages/about.html";
      break;
    default:
      filePath = "./ServerPages/404.html";
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      resp.statusCode = 500;
      resp.write("Internal Error");
      resp.end();
      console.log(err);
    } else {
      resp.statusCode = 200;
      resp.write(data, "utf8", () => {
        console.log("response sent");
      });
      resp.end();
    }
  });
};

const port = 3000;

const server = http.createServer(callServer);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
