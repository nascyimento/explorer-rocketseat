import { timer } from "./main.js";

const modalWrapper = document.querySelector("#modal-wrapper");
const form = document.querySelector("form");
const minutesInput = document.querySelector("#input-minutes");

function handleMinutesInputChange() {
  if (minutesInput.value.length > 2) {
    minutesInput.value = minutesInput.value.substring(0, 2);
    return;
  }
  minutesInput.value = minutesInput.value.replace(/\D/g, "");
}

export default function handleMinutesInputSubmit(evt) {
  evt.preventDefault();
  if (minutesInput.value) {
    timer.setTime(minutesInput.value);
    minutesInput.value = null;
    toggleModal();
  }
}

export function toggleModal() {
  modalWrapper.classList.toggle("open");
  if (modalWrapper.classList.contains("open")) {
    focusMinuteInput();
  }
}

function focusMinuteInput() {
  setTimeout(() => minutesInput.focus(), 100);
}

form.addEventListener("submit", (evt) => handleMinutesInputSubmit(evt));

minutesInput.addEventListener("input", handleMinutesInputChange);
