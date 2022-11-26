export default class FormValidator {
  constructor(params, form) {
    this._inputSelector = params.inputSelector;
    this._form = form;
    this._submitButtonSelector = params.submitButtonSelector;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputErrorClass = params.inputErrorClass;
    this._errorClass = params.errorClass;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
  }

  resetValidation = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  _setButtonState = (isActive) => {
    if (isActive) {
      this._submitButton.disabled = false;
    } else {
      this._submitButton.disabled = true;
    }
  };

  _handleInputForm = (inputElement) => {
    this._checkInputValidity(inputElement);
    this._toggleButtonState();
  };

  _setEventListeners = () => {
    this._toggleButtonState();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._handleInputForm(inputElement);
      });
    });
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._setButtonState(false);
    } else {
      this._setButtonState(true);
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
