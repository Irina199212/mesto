const enableValidation = (params) => {
  const form = document.querySelector(params.formSelector);
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });

  const inputList = Array.from(form.querySelectorAll(params.inputSelector));
  const buttonSubmit = form.querySelector(params.submitButtonSelector);
  toggleButtonState(inputList, buttonSubmit);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(form, inputElement, params);
      toggleButtonState(inputList, buttonSubmit);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.removeAttribute("disabled");
  }
};

const checkInputValidity = (formElement, inputElement, params) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

const showInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(params.errorClass);
};

const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = "";
};
