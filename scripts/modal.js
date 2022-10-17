const Modal = {
  wrapper: document.querySelector(".modal-wrapper"),
  buttonClose: document.querySelector("button.close"),
  message: document.querySelector(".modal-wrapper h2.title span"),
  isOpen: false,
  open(imc) {
    this.wrapper.classList.add("open");
    this.isOpen = true;
    this.message.textContent = imc;
  },
  close() {
    this.wrapper.classList.remove("open");
    this.isOpen = false;
  },
};

Modal.buttonClose.addEventListener("click", Modal.close);
Modal.wrapper.addEventListener("click", closeModalByClickOverlay);

function closeModalByClickOverlay(event) {
  if (event.target == event.currentTarget) {
    Modal.close();
  }
}

function closeModalByClickEnter({ key }) {
  if (Modal.isOpen && key == "Escape") {
    Modal.close();
  }
}

window.addEventListener("keydown", closeModalByClickEnter);

export default Modal;