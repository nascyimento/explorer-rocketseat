export default function Timer({
  minutes,
  timerTimeout,
  minutesDisplay,
  secondsDisplay,
  buttonPlay,
  buttonPause,
  buttonSetTime,
  buttonStop,
}) {
  let starting = true;

  function play() {
    if (minutesDisplay.textContent > 0 || secondsDisplay.textContent > 0) {
      buttonPlay.classList.add("hidden");
      buttonPause.classList.remove("hidden");
      buttonSetTime.classList.add("hidden");
      buttonStop.classList.remove("hidden");
      countDown();
      starting = false;
    }
  }

  function pause() {
    buttonPlay.classList.remove("hidden");
    buttonPause.classList.add("hidden");
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
  }

  function setTime() {
    minutes = prompt("Defina o tempo...") || "00";
    minutesDisplay.textContent = minutes.padStart(2, "00");
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

  return {
    play,
    pause,
    stop,
    setTime,
    countDown,
  };
}
