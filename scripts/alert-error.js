const alertError = document.querySelector(".alert-box");
let timeCount;

export default function showAndHideAlertError() {
  clearTimeout(timeCount);
  alertError.classList.add("open");
  timeCount = setTimeout(() => alertError.classList.remove("open"), 4500);
}
