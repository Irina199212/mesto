import "./index.css";
import { cardsDataList } from "../utils/data.js";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm";

const formData = {
  inputSelector: ".form__text",
  submitButtonSelector: ".form__button",
  inputErrorClass: "form__text_error",
  errorClass: "error_open",
};

const buttonOpenPopupCard = document.querySelector(".profile__button-add");
const buttonOpenPopupProfile = document.querySelector(".profile__button-edit");

const profileForm = document.forms["profile-form"];
const inputNameProfileForm = profileForm.querySelector(".form__text_name_name");
const inputJobProfileForm = profileForm.querySelector(".form__text_name_post");

const cardForm = document.forms["add-card-form"];

const validateCardForm = new FormValidator(formData, cardForm);
validateCardForm.enableValidation();

const validateProfileForm = new FormValidator(formData, profileForm);
validateProfileForm.enableValidation();

const popupCardImage = new PopupWithImage(".popup_image");
popupCardImage.setEventListeners();

function handleCardClick(name, link) {
  popupCardImage.open(name, link);
}

const handleOpenCardPopup = () => {
  validateCardForm.resetValidation();
  cardPopup.open();
};

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card", handleCardClick);
  return cardElement.createCard();
}

const addCardPopupFormSubmitHandler = (cardData) => {
  render.addItem(createCard(cardData));
  cardPopup.close();
};

const handleProfileFormSubmit = (userData) => {
  userInfo.setUserInfo(userData.name, userData.post);
  profilePopup.close();
};

const cardPopup = new PopupWithForm(
  ".popup_add-card",
  addCardPopupFormSubmitHandler
);
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm(
  ".popup_profile-form",
  handleProfileFormSubmit
);
profilePopup.setEventListeners();

const userInfo = new UserInfo({
  selectorName: ".profile__title",
  selectorDescription: ".profile__subtitle",
});

const handleOpenProfilePopup = () => {
  const userData = userInfo.getUserInfo();
  inputNameProfileForm.value = userData.name;
  inputJobProfileForm.value = userData.description;
  validateProfileForm.resetValidation();
  profilePopup.open();
};

const render = new Section(
  {
    items: cardsDataList,
    renderer: createCard,
  },
  ".elements"
);

render.renderer();

buttonOpenPopupCard.addEventListener("click", handleOpenCardPopup);
buttonOpenPopupProfile.addEventListener("click", handleOpenProfilePopup);
