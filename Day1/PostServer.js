const fs = require("fs");
const http = require ("http");

const callServer = (req,resp)=>{
fs.readFile("./post.txt", "utf8", (err, data) => {
  if (err) {
    resp.statusCode=500;
    resp.write("Internal Error")
    resp.end()
    console.log(err);
  } else {
    const post = (data);
    resp.statusCode=200;
    resp.write(post ,"utf8" ,()=>{console.log("response sent")});
    resp.end();
  }
});

}

const port = 3000;

const server = http.createServer(callServer);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
