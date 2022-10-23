const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, params);
  });
};

const setButtonState = (buttonElement, isActive) => {
  if (isActive) {
    buttonElement.disabled = false;
  } else {
    buttonElement.disabled = true;
  }
};

const setEventListeners = (formElement, params) => {
  const buttonElement = formElement.querySelector(params.submitButtonSelector);

  const inputList = Array.from(
    formElement.querySelectorAll(params.inputSelector)
  );

  toggleButtonState(inputList, buttonElement);

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, params);
      toggleButtonState(inputList, buttonElement);
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
    setButtonState(buttonElement, false);
  } else {
    setButtonState(buttonElement, true);
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
