"use strict";

function Stopwatch() {
  let miliseconds = 0;
  let seconds = 0;
  let minutes = 0;
  let interval;
  let laps = [];
  let isStarting = false;
  let screen = document.getElementById("screen");
  let lapList = document.getElementById("lap-list");
  function counter() {
    miliseconds++;
    if (miliseconds > 99) {
      seconds++;
      miliseconds = 0;
      if (seconds > 59) {
        minutes++;
        seconds = 0;
      }
    }
    screen.innerHTML = getTime();
  }
  function getTime() {
    return `${minutes > 9 ? minutes : "0" + minutes}:${
      seconds > 9 ? seconds : "0" + seconds
    }:${miliseconds > 9 ? miliseconds : "0" + miliseconds}`;
  }
  function createLap() {
    if (getTime() === "00:00:00") return;
    for (const i of laps) {
      if (i === getTime()) return;
    }
    let lap = document.createElement("h3");
    lap.innerHTML = getTime();
    laps.push(getTime());
    lapList.appendChild(lap);
  }
  this.start = function () {
    if (isStarting) return;
    interval = setInterval(counter, 10);
    isStarting = true;
  };

  this.stop = function () {
    clearInterval(interval);
    isStarting = false;
  };

  this.lap = function () {
    createLap();
  };

  this.restart = function () {
    miliseconds = 0;
    seconds = 0;
    minutes = 0;
    laps = [];
    screen.innerHTML = "00:00:00";
    lapList.innerHTML = "";
    isStarting = false;
    clearInterval(interval);
  };
}
