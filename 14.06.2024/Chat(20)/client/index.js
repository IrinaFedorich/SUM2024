import {f} from "./b.js";

console.log("ABC");
f();

setTimeout(async () => {
  const response = await fetch("/getdata");
  const text = await response.text();

  console.log(text);
  console.log(text);
  const elem = document.getElementById("getdata");
  elem.textContent = text;
}, 1000);
