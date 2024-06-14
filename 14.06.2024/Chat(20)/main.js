import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import express from "express";

// const requestListener = async (req, res) => {
//   if (req.url == "/") {
//     const contents = await fs.readFile(
//         process.cwd() + "/client/index.html",
//     );
//     res.setHeader("Content-Type", "text/html");
//     res.writeHead(200);
//     res.end(contents);
//   } else {
//       if (req.url.endsWith(".js")) {
//         const contents = await fs.readFile(
//             process.cwd() + "/client" + req.url,
//         );
//         res.setHeader("Content-Type", "text/javascript");
//         res.writeHead(200);
//         res.end(contents);
//       }
//     }
// }

  const app = express();

  let counter = 0;
  
  app.get('/getdata', (req, res, next) => {
    counter++;
    console.log(counter);
    next();
  });

  app.get('/getdata', (req, res, next) => {
    res.send(`pupupu: ${counter}`)
  });

  app.use(express.static("client"));

  const server = http.createServer(app);

  const host = `127.0.0.1`;
  const port = 8081

  server.listen(port, host, ()=>{
    console.log(`Server started on http://${host}:${port}`)
  })


