let ws = new WebSocket("ws://localhost:8000");
let message, name, chat, m = "";

function sendMessage() {
    name = document.getElementById("name");
    message = document.getElementById("message");
    chat = document.getElementById("message_list");
   
    if (
        typeof name == "undefined" ||
        name == null ||
        typeof message == "undefined" ||
        message == null 
    ) {
        console.log("No text");
        return;
    }

    if (name == "") {
        chat += "Wrong name\n";
        return;
    }
    if (message == "") {
        chat += "Wrong message\n";
        return;
    }

    ws.send(`${name}: ${message}\n`);
}

function initializeCommunication() {
    ws.onmessage = (text) => {
        const ch = document.getElementById("chat");
        chat += text.data;
    };
}

$(document).ready(() =>{
  initializeCommunication();
});




























import { f } from "./b.js";

console.log(`ABC`);

setInterval(async () => {
  const response = await fetch("/getSecretData");
  const text = await response.text();

  console.log(text);

  const elem = document.getElementById("SecretDataField");
  elem.textContent = text;
}, 1000);

function initializeCommunication(){
  let socket = new WebSocket("ws://localhost:8000");

  socket.onmessage = (event) => {
    console.log("Socket open");
    socket.send("Hello from client");
  };

  socket.onmessage = (event) => {
    console.log(`Message received ${event.data}`)
  }
}

initializeCommunication();