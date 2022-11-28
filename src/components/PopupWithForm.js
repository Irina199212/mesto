import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callbackSubmit = callback;
    this._formElement = this._popupElement.querySelector("form");
    this._inputList = Array.from(this._formElement.querySelectorAll("input"));
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  _getInputValues() {
    const formData = {};
    this._inputList.forEach((element) => {
      formData[element.name] = element.value;
    });
    return formData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackSubmit(this._getInputValues());
    });
  }
}
