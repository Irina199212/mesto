import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const nameTitle = document.querySelector(".profile__title");
const jobTitle = document.querySelector(".profile__subtitle");
const cardsContainer = document.querySelector(".elements");

const buttonOpenPopupCard = document.querySelector(".profile__button-add");
const buttonOpenPopupProfile = document.querySelector(".profile__button-edit");

const profilePopup = document.querySelector(".popup_profile-form");
const profileForm = profilePopup.querySelector("form[name='profile-form']");
const buttonClosePopupProfile = profilePopup.querySelector(".popup__close");
const inputNameProfileForm = profileForm.querySelector(".form__text_name_name");
const inputJobProfileForm = profileForm.querySelector(".form__text_name_post");
const buttonSubmitProfileForm = profileForm.querySelector(".form__button");

const cardPopup = document.querySelector(".popup_add-card");
const cardForm = cardPopup.querySelector("form[name='add-card-form']");
const buttonClosePopupCard = cardPopup.querySelector(".popup__close");
const inputTitleCardForm = cardForm.querySelector(".form__text_name_name");
const inputLinkCardForm = cardForm.querySelector(".form__text_name_link");
const buttonSubmitCardForm = cardForm.querySelector(".form__button");

const popupImage = document.querySelector(".popup_image");
const buttonClosePopupImage = popupImage.querySelector(".popup__close");

export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

const handleCloseByEsc = (event) => {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

const handleCloseByOverlay = (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
};

const renderInitialCards = () => {
  cardsDataList.forEach((cardData) => {
    cardsContainer.append(new Card(cardData, "#card").createCard());
  });
};

const validateCardForm = new FormValidator(
  {
    inputSelector: ".form__text",
    submitButtonSelector: ".form__button",
    inputErrorClass: "form__text_error",
    errorClass: "error_open",
  },
  "form[name='add-card-form']"
);
validateCardForm.enableValidation();

const handleOpenCardPopup = () => {
  cardForm.reset();
  validateCardForm._hideInputError(inputTitleCardForm);
  validateCardForm._hideInputError(inputLinkCardForm);
  validateCardForm._setButtonState(buttonSubmitCardForm, false);
  openPopup(cardPopup);
};

const closePopupCardHandler = () => {
  closePopup(cardPopup);
};

const addCardPopupFormSubmitHandler = (evt) => {
  evt.preventDefault();

  const cardData = {
    name: inputTitleCardForm.value,
    link: inputLinkCardForm.value,
  };
  cardsContainer.prepend(new Card(cardData, "#card").createCard());
  closePopup(cardPopup);
};

const closePopupProfileHandler = () => {
  closePopup(profilePopup);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  nameTitle.textContent = inputNameProfileForm.value;
  jobTitle.textContent = inputJobProfileForm.value;
  closePopup(profilePopup);
};

const validateProfileForm = new FormValidator(
  {
    inputSelector: ".form__text",
    submitButtonSelector: ".form__button",
    inputErrorClass: "form__text_error",
    errorClass: "error_open",
  },
  "form[name='profile-form']"
);
validateProfileForm.enableValidation();

const handleOpenProfilePopup = () => {
  inputNameProfileForm.value = nameTitle.textContent;
  inputJobProfileForm.value = jobTitle.textContent;
  validateProfileForm._hideInputError(inputNameProfileForm);
  validateProfileForm._hideInputError(inputJobProfileForm);
  validateProfileForm._setButtonState(buttonSubmitProfileForm, true);
  openPopup(profilePopup);
};

const closeImage = () => {
  closePopup(popupImage);
};

renderInitialCards();

buttonOpenPopupCard.addEventListener("click", handleOpenCardPopup);
buttonOpenPopupProfile.addEventListener("click", handleOpenProfilePopup);

cardForm.addEventListener("submit", addCardPopupFormSubmitHandler);
profileForm.addEventListener("submit", handleProfileFormSubmit);
document.addEventListener("keydown", handleCloseByEsc);

profilePopup.addEventListener("click", handleCloseByOverlay);
cardPopup.addEventListener("click", handleCloseByOverlay);
popupImage.addEventListener("click", handleCloseByOverlay);

buttonClosePopupProfile.addEventListener("click", closePopupProfileHandler);
buttonClosePopupCard.addEventListener("click", closePopupCardHandler);
buttonClosePopupImage.addEventListener("click", closeImage);
