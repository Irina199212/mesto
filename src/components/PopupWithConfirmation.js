import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callbackSubmit = callback;
    this._formElement = this._popupElement.querySelector("form");
  }
  open(id) {
    this._id = id
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackSubmit(this._id);
    });
  }
}
