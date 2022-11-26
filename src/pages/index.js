import "./index.css";
import { cardsDataList } from "../components/data.js";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";

const formData = {
  inputSelector: ".form__text",
  submitButtonSelector: ".form__button",
  inputErrorClass: "form__text_error",
  errorClass: "error_open",
};

const nameTitle = document.querySelector(".profile__title");
const jobTitle = document.querySelector(".profile__subtitle");
const cardsContainer = document.querySelector(".elements");

const buttonOpenPopupCard = document.querySelector(".profile__button-add");
const buttonOpenPopupProfile = document.querySelector(".profile__button-edit");

const profilePopup = document.querySelector(".popup_profile-form");
const profileForm = document.forms["profile-form"];
const inputNameProfileForm = profileForm.querySelector(".form__text_name_name");
const inputJobProfileForm = profileForm.querySelector(".form__text_name_post");

const cardPopup = document.querySelector(".popup_add-card");
const cardForm = document.forms["add-card-form"];
const inputTitleCardForm = cardForm.querySelector(".form__text_name_name");
const inputLinkCardForm = cardForm.querySelector(".form__text_name_link");

const popupImage = document.querySelector(".popup_image");
const popupPicture = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__text");

const popups = document.querySelectorAll(".popup");

const openPopup = (popup) => {
  document.addEventListener("keydown", handleCloseByEsc);
  popup.classList.add("popup_opened");
};

const closePopup = (popup) => {
  document.removeEventListener("keydown", handleCloseByEsc);
  popup.classList.remove("popup_opened");
};

const handleCloseByEsc = (event) => {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

function handleCardClick(name, link) {
  popupPicture.src = link;
  popupPicture.alt = name;
  popupCaption.textContent = name;
  openPopup(popupImage);
}

const renderInitialCards = () => {
  cardsDataList.forEach((cardData) => {
    cardsContainer.append(createCard(cardData));
  });
};

const validateCardForm = new FormValidator(formData, cardForm);
validateCardForm.enableValidation();

const handleOpenCardPopup = () => {
  cardForm.reset();
  validateCardForm.resetValidation();
  openPopup(cardPopup);
};

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card", handleCardClick);
  return cardElement.createCard();
}

const addCardPopupFormSubmitHandler = (evt) => {
  evt.preventDefault();

  const cardData = {
    name: inputTitleCardForm.value,
    link: inputLinkCardForm.value,
  };
  cardsContainer.prepend(createCard(cardData));
  closePopup(cardPopup);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  nameTitle.textContent = inputNameProfileForm.value;
  jobTitle.textContent = inputJobProfileForm.value;
  closePopup(profilePopup);
};

const validateProfileForm = new FormValidator(formData, profileForm);
validateProfileForm.enableValidation();

const handleOpenProfilePopup = () => {
  inputNameProfileForm.value = nameTitle.textContent;
  inputJobProfileForm.value = jobTitle.textContent;
  validateProfileForm.resetValidation();
  openPopup(profilePopup);
};

renderInitialCards();

buttonOpenPopupCard.addEventListener("click", handleOpenCardPopup);
buttonOpenPopupProfile.addEventListener("click", handleOpenProfilePopup);

cardForm.addEventListener("submit", addCardPopupFormSubmitHandler);
profileForm.addEventListener("submit", handleProfileFormSubmit);

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});
