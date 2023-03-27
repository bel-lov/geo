/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/coords.js
function getCoords(value) {
  const coords = value.split(",");
  const latitude = coords[0].trim();
  const longitude = coords[1].trim();
  if (/^\[?-?\d{1,2}\.\d{1,9}\]?$/.test(latitude) && /^\[?-?\d{1,2}\.\d{1,9}\]?$/.test(longitude)) {
    return coords;
  }
  return false;
}
;// CONCATENATED MODULE: ./src/js/textEntry.js

class Message {
  constructor(time, text, coords) {
    this.time = time;
    this.text = text;
    this.coords = coords;
  }
  addMessage() {
    const timeline = document.querySelector(".timeline");
    const message = document.createElement("div");
    message.classList.add("message");
    const time = document.createElement("div");
    time.classList.add("time");
    time.textContent = this.time;
    const text = document.createElement("div");
    text.classList.add("text");
    text.textContent = this.text;
    const coords = document.createElement("div");
    coords.classList.add("coords");
    coords.textContent = this.coords;
    message.appendChild(time);
    message.appendChild(text);
    message.appendChild(coords);
    timeline.appendChild(message);
  }
}
function createMessage(time, text, coords) {
  const input = document.querySelector(".input");
  const message = new Message(time, text, coords);
  message.addMessage(message);
  input.value = "";
  save(message);
  input.focus();
}
;// CONCATENATED MODULE: ./src/js/storage.js

const allMessages = [];
function save(message) {
  allMessages.push(message);
  localStorage.setItem("messages", JSON.stringify({
    messages: allMessages
  }));
}
function load() {
  let saveMessages;
  try {
    saveMessages = JSON.parse(localStorage.getItem("messages"));
    if (saveMessages.messages) {
      saveMessages.messages.forEach(item => {
        createMessage(item.time, item.text, item.coords);
      });
    }
  } catch (e) {
    console.log("Ошибка", e);
  }
}
;// CONCATENATED MODULE: ./src/js/time.js
function getTime() {
  const newDate = new Date();
  let date = newDate.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let month = newDate.getMonth();
  if (month < 10) {
    month = `0${month}`;
  }
  const year = newDate.getFullYear();
  let hours = newDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = newDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${date}.${month}.${year} ${hours}:${minutes}`;
}
;// CONCATENATED MODULE: ./src/js/app.js




const app_form = document.querySelector(".form");
const modal = document.querySelector(".modal");
const inputMessage = document.querySelector(".input");
const inputModal = document.querySelector(".location");
const input = document.querySelector(".input");
load();
function getLocation() {
  modal.style.display = "block";
  inputModal.focus();
}
app_form.addEventListener("submit", event => {
  event.preventDefault();
  const {
    value
  } = inputMessage;
  const time = getTime();
  let coords;
  if (navigator.geolocation) {
    const locationCoords = () => new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(position);
      }, error => {
        console.log(error);
        reject(getLocation());
      });
    });
    locationCoords().then(position => {
      coords = `[${position.coords.latitude}, -${position.coords.longitude}]`;
      createMessage(time, value, coords);
    });
  } else {
    getLocation(time, value);
  }
});
const locationForm = document.querySelector(".locationForm");
locationForm.addEventListener("submit", e => {
  e.preventDefault();
  const time = getTime();
  const {
    value
  } = inputMessage;
  if (inputModal.value.includes(",")) {
    const inputed = getCoords(inputModal.value);
    if (inputed === false) {
      alert("Ошибка ввода");
    } else {
      modal.style.display = "none";
      createMessage(time, value, inputed);
      inputModal.value = "";
    }
  } else {
    alert("Проверьте правильность ввода");
  }
});
const exit = document.querySelector(".exit");
exit.addEventListener("click", () => {
  modal.style.display = "none";
  input.focus();
});
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;