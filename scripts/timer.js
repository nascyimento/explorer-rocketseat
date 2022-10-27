import { buttonPressAudio, kitchenTimer } from "./sounds.js";

export default function Timer({ buttonPlay, buttonPause, buttonSetTime, buttonStop, }) {
  const minutesDisplay = document.querySelector("#minutes");
  const secondsDisplay = document.querySelector("#seconds");

  let starting = true, isRunning = false;
  let timerTimeout, minutes = "0";

  function play() {
    if (minutesDisplay.textContent > 0 || secondsDisplay.textContent > 0) {
      buttonPlay.classList.add("hidden");
      buttonPause.classList.remove("hidden");
      buttonSetTime.classList.add("hidden");
      buttonStop.classList.remove("hidden");
      starting = false;
      isRunning = true;
      countDown();
    }
  }

  function pause() {
    buttonPlay.classList.remove("hidden");
    buttonPause.classList.add("hidden");
    isRunning = false;
    clearInterval(timerTimeout);
  }

  function stop() {
    buttonPlay.classList.remove("hidden");
    buttonPause.classList.add("hidden");
    buttonSetTime.classList.remove("hidden");
    buttonStop.classList.add("hidden");

    clearInterval(timerTimeout);

    minutesDisplay.textContent = String(minutes).padStart(2, "00");
    secondsDisplay.textContent = "00";
    starting = true;
    isRunning = false;
  }

  function setTime(minutesTime) {
    minutes = minutesTime || minutes;
    if (!isNaN(minutes)) {
      minutesDisplay.textContent = minutes.padStart(2, "0");
    } else {
      minutesDisplay.textContent = "00";
    }
    
  }

  function countDown() {
    if (starting) {
      updateTimerDisplay(secondsDisplay, 60);
      updateTimerDisplay(minutesDisplay, minutesDisplay.textContent);
    }
    timerTimeout = setInterval(() => {
      let seconds = Number(secondsDisplay.textContent);
      let minutes = Number(minutesDisplay.textContent);

      if (minutes <= 0 && seconds == 0) {
        stop();
        kitchenTimer.play();
        return;
      }

      if (seconds <= 0) {
        seconds = 60;
        updateTimerDisplay(minutesDisplay, minutes);
      }

      updateTimerDisplay(secondsDisplay, seconds);
    }, 1000);
  }

  function updateTimerDisplay(timeDisplay, currentTime) {
    timeDisplay.textContent = String(currentTime - 1).padStart(2, "00");
  }

  function handleSpaceBarPress() {
    if (isRunning) pause();
    else play();

    buttonPressAudio.play();
  }

  return { play, pause, stop, setTime, countDown, handleSpaceBarPress };
}
