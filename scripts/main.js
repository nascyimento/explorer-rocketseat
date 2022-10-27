import Timer from "./timer.js";

const buttonPlay = document.querySelector("#play");
const buttonPause = document.querySelector("#pause");
const buttonStop = document.querySelector("#stop");
const buttonSetTime = document.querySelector("#set-time");
const buttonSoundOn = document.querySelector("#sound-on");
const buttonSoundOff = document.querySelector("#sound-off");

const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");

let timerTimeout,
  minutes = "0",
  seconds = 0,
  isRunning = false;

const timer = Timer({
  minutes,
  timerTimeout,
  seconds,
  minutesDisplay,
  secondsDisplay,
  buttonPlay,
  buttonPause,
  buttonSetTime,
  buttonStop,
});

function toggleSound() {
  buttonSoundOff.classList.toggle("hidden");
  buttonSoundOn.classList.toggle("hidden");
}

buttonPlay.addEventListener("click", timer.play);
buttonPause.addEventListener("click", timer.pause);
buttonStop.addEventListener("click", timer.stop);
buttonSetTime.addEventListener("click", timer.setTime);
buttonSoundOn.addEventListener("click", toggleSound);
buttonSoundOff.addEventListener("click", timer.toggleSound);

onload = timer.setTime;
window.addEventListener("keydown", (evt) => {
  if (evt.key === " ") {
    timer.handleSpaceBarPress();
  }
});
