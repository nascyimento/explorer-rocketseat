(function () {
  let randomNumber,
    attempts = 0,
    tryAgainText;

  const screenOne = document.querySelector("#screen-one");
  const input = document.querySelector("#input");
  const attemptButton = document.querySelector("#button");
  const screenTwo = document.querySelector("#screen-two");
  const resetButton = document.querySelector("#screen-two button");

  attemptButton.addEventListener("click", handleAttemptButtonClick);
  resetButton.addEventListener("click", handleResetButtonClick);

  function generateRandomNumber() {
    randomNumber = Math.round(Math.random() * 10);
  }

  function handleAttemptButtonClick() {
    if (input.value) {
      attempts++;
      if (input.value == randomNumber) {
        setCongrattText();
        changeScreen();
      } else if (attempts == 1) {
        tryAgainText = document.createElement("p");
        tryAgainText.textContent = "Tente novamente";
        tryAgainText.style.marginTop = "1.6rem";
        screenOne.appendChild(tryAgainText);
      }
    }
  }

  function handleResetButtonClick() {
    attempts = 0;
    generateRandomNumber();
    changeScreen();
    input.value = null;
    tryAgainText?.parentElement.removeChild(tryAgainText);
  }

  function changeScreen() {
    screenOne.classList.toggle("hide");
    screenTwo.classList.toggle("hide");
  }

  function setCongrattText() {
    let text = screenTwo.querySelector("h2");
    text.textContent = `Acertou em ${attempts} ${
      attempts > 1 ? "tentativas" : "tentativa"
    }`;
  }

  generateRandomNumber();
})();
