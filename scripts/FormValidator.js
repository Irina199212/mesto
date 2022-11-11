export default class FormValidator {
  constructor(params, selector) {
    this._inputSelector = params.inputSelector;
    this._selector = selector;
    this._form = document.querySelector(this._selector);
    this._submitButtonSelector = params.submitButtonSelector;
    this._inputErrorClass = params.inputErrorClass;
    this._errorClass = params.errorClass;
  }

  enableValidation = () => {
    this._setEventListeners();
  };

  _setButtonState = (buttonElement, isActive) => {
    if (isActive) {
      buttonElement.disabled = false;
    } else {
      buttonElement.disabled = true;
    }
  };

  _handleInputForm = (inputList, inputElement, buttonElement) => {
    this._checkInputValidity(inputElement);
    this._toggleButtonState(inputList, buttonElement);
  };

  _setEventListeners = () => {
    const buttonElement = this._form.querySelector(this._submitButtonSelector);

    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );

    this._toggleButtonState(inputList, buttonElement);

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._handleInputForm(inputList, inputElement, buttonElement);
      });
    });
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      this._setButtonState(buttonElement, false);
    } else {
      this._setButtonState(buttonElement, true);
    }
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };
}
