import Modal from "./modal.js";
import showAndHideAlertError from "./alert-error.js";
import { calculateIMC, validateIMC } from "./utils.js";

const form = document.querySelector("form");
const weightInput = document.querySelector("#weight");
const heightInput = document.querySelector("#height");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const imc = calculateIMC(weightInput.value, heightInput.value);
  if (validateIMC(imc)) {
    Modal.open(imc);
  } else {
    showAndHideAlertError();
  }
}
