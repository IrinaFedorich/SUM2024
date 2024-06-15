import http from "node:http";
import { WebSocketServer } from "ws";

import express from "express";

const app = express();

const users = new Set();
let messages = new Set();

app.get("/", (req, res, next) => {
    next();
});

app.use(express.static("client"));

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    users.add(ws);

    wss.on("message", (message) => {
        console.log(message.toString());
    });
    ws.onmessage = (m) => {
        let p = m.data;
        messages.add(p);

        console.log(messages);
        for (let user of users) {
            user.send(p);
        }
    };
});

const host = "localhost";
const port = 8000;

server.listen(port, host, () =>{
  console.log(`Server started on http://${host}:${port}`);
});