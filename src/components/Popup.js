export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__close")) {
        this.close();
      }
    });
  }

  open() {
    document.addEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    document.removeEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
    this._popupElement.classList.remove("popup_opened");
  }
}
