import { toggleModal } from "./modal.js";
import { Sounds } from "./sounds.js";
import Timer from "./timer.js";

const buttonPlay = document.querySelector("#play");
const buttonPause = document.querySelector("#pause");
const buttonStop = document.querySelector("#stop");
const buttonSetTime = document.querySelector("#set-time");
const buttonSoundOn = document.querySelector("#sound-on");
const buttonSoundOff = document.querySelector("#sound-off");

export const timer = Timer({ buttonPlay, buttonPause, buttonSetTime, buttonStop, });

const { soundOn, soundOff, addButtonsCLickSound } = Sounds({ buttonSoundOn, buttonSoundOff, });

buttonPlay.addEventListener("click", timer.play);
buttonPause.addEventListener("click", timer.pause);
buttonStop.addEventListener("click", timer.stop);
buttonSetTime.addEventListener("click", toggleModal);
buttonSoundOn.addEventListener("click", soundOn);
buttonSoundOff.addEventListener("click", soundOff);

addButtonsCLickSound(buttonPlay, buttonPause, buttonStop, buttonSetTime, buttonSoundOn, buttonSoundOff);

window.addEventListener("keydown", (evt) => {
  if (evt.key === " ") {
    timer.handleSpaceBarPress();
  }
});

window.onload = toggleModal