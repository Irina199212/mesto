const enableValidation = (params) => {
  console.log(params);
};

const inputValidateAddCardForm = (inputElement) => {
  const errorElement = cardForm.querySelector(`#${inputElement.id}-error`);
  if (inputElement.checkValidity()) {
    inputElement.classList.remove("form__text_error");
    errorElement.textContent = "";
    errorElement.classList.remove("error_open");
  } else {
    inputElement.classList.add("form__text_error");
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add("error_open");
  }
};

const addCardPopupValidate = () => {
  inputValidateAddCardForm(inputTitleCardForm);
  inputValidateAddCardForm(inputLinkCardForm);

  if (cardForm.checkValidity()) {
    buttonSubmitCardForm.removeAttribute("disabled");
  } else {
    buttonSubmitCardForm.setAttribute("disabled", "true");
  }
};
