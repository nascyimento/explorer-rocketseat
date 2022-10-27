export const buttonPressAudio = new Audio(
  "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true"
);
export const kitchenTimer = new Audio(
  "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true"
);
const bgAudio = new Audio(
  "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/bg-audio.mp3?raw=true"
);

bgAudio.loop = true;

export function Sounds({ buttonSoundOn, buttonSoundOff }) {
  function addButtonsCLickSound(...buttons) {
    buttons.forEach((button) =>
      button.addEventListener("click", () => buttonPressAudio.play())
    );
  }

  function soundOn() {
    buttonSoundOn.classList.add("hidden");
    buttonSoundOff.classList.remove("hidden");
    bgAudio.pause();
   }
   
   function soundOff() {
      buttonSoundOn.classList.remove("hidden");
      buttonSoundOff.classList.add("hidden");
      bgAudio.play();
  }

  return {
    soundOn,
    soundOff,
    addButtonsCLickSound,
  };
}
