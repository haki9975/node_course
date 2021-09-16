const http = require("http");
const path = require("path");
const fs = require("fs");
const { isBuffer } = require("util");

const server = http.createServer((req, resp) => {
  //   if (req.url === "/") {
  //     fs.readFile(
  //       path.join(__dirname, "public", "index.html"),
  //       (err, content) => {
  //         if (err) throw err;
  //         resp.writeHead(200, { "Content-Type": "text/html" });
  //         resp.end(content);
  //       }
  //     );
  //   }
  //   if (req.url === "/api/users") {
  //     const users = [
  //       { name: "Bob Smith", age: 50 },
  //       { name: "John Doe", age: 30 },
  //     ];
  //     resp.writeHead(200, { "Content-Type": "application/json" });
  //     resp.end(JSON.stringify(users));
  //   }

  // Build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Extension of file
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  //Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/html";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        //Page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            resp.writeHead(200, { "Content-Type": "text/html" });
            resp.end(content, "utf8");
          }
        );
      } else {
        // Some server error
        resp.writeHead(500);
        resp.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      resp.writeHead(200, { "Content-Type": contentType });
      resp.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
