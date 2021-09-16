const http = require("http");
const path = require("path");
const fs = require("fs");
const { isBuffer } = require("util");

const server = http.createServer((req, resp) => {
  if (req.url === "/") {
    fs.readFile(
      path.join(__dirname, "public", "index.html"),
      (err, content) => {
        if (err) throw err;
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.end(content);
      }
    );
  }
  if (req.url === "/about") {
    fs.readFile(
      path.join(__dirname, "public", "about.html"),
      (err, content) => {
        if (err) throw err;
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.end(content);
      }
    );
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
