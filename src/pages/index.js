import "./index.css";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import Api from "../components/Api";

const formData = {
  inputSelector: ".form__text",
  submitButtonSelector: ".form__button",
  inputErrorClass: "form__text_error",
  errorClass: "error_open",
};

const api = new Api({
  cardsUrl: "https://mesto.nomoreparties.co/v1/cohort-55/cards",
  userInfoUrl: "https://nomoreparties.co/v1/cohort-55/users/me",
  userInfoUpdateUrl: "https://mesto.nomoreparties.co/v1/cohort-55/users/me",
  headers: {
    authorization: "06de55a6-944c-4900-b569-16060b72461e",
    "Content-Type": "application/json",
  },
});

const buttonOpenPopupCard = document.querySelector(".profile__button-add");

const buttonOpenPopupAvatar = document.querySelector(".profile__avatar");
const avatarForm = document.forms["profile-avatar-form"];

const buttonOpenPopupProfile = document.querySelector(".profile__button-edit");
const profileForm = document.forms["profile-form"];
const inputNameProfileForm = profileForm.querySelector(".form__text_name_name");
const inputJobProfileForm = profileForm.querySelector(".form__text_name_post");

const cardForm = document.forms["add-card-form"];

const validateCardForm = new FormValidator(formData, cardForm);
validateCardForm.enableValidation();

const validateAvatarForm = new FormValidator(formData, avatarForm);
validateAvatarForm.enableValidation();

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

function handleRemoveCard(id) {
  cardRemovePopup.open(id);
}

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card",
    handleCardClick,
    userInfo.getUserInfo(),
    handleRemoveCard,
    handleSetLikeCard,
    handleRemoveLikeCard
  );
  return cardElement.createCard();
}

const addCardPopupFormSubmitHandler = (cardData) => {
  cardPopup.setLoader(true);
  api
    .addCard(cardData)
    .then((res) => {
      render.addItem(createCard(res));
      cardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardPopup.setLoader(false);
    });
};

const handleProfileFormSubmit = (userData) => {
  profilePopup.setLoader(true);
  api
    .updateUserInfo(userData)
    .then((res) => {
      userInfo.setUserInfo(res);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.setLoader(false);
    });
};

const avatarPopupFormSubmitHandler = (userData) => {
  avatarPopup.setLoader(true);
  api
    .updateUserAvatar(userData)
    .then((res) => {
      userInfo.setUserInfo(res);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.setLoader(false);
    });
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

const cardRemovePopup = new PopupWithConfirmation(
  ".popup_card-remove",
  handleCardRemoveFormSubmit
);
cardRemovePopup.setEventListeners();

function handleCardRemoveFormSubmit(card) {
  api
    .removeCard(card._id)
    .then(() => {
      card.handleDeleteCard();
      cardRemovePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleSetLikeCard(card) {
  api
    .setLikeCard(card._id)
    .then((res) => {
      card.setLikesButtonFlag(true);
      card.setLikesCounter(res.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleRemoveLikeCard(card) {
  api
    .removeLikeCard(card._id)
    .then((res) => {
      card.setLikesButtonFlag(false);
      card.setLikesCounter(res.likes);
    })
    .catch((err) => {
      console.log(err);
    });
}

const avatarPopup = new PopupWithForm(
  ".popup_profile-avatar",
  avatarPopupFormSubmitHandler
);
avatarPopup.setEventListeners();

const handleOpenAvatarPopup = () => {
  validateAvatarForm.resetValidation();
  avatarPopup.open();
};

const userInfo = new UserInfo({
  selectorName: ".profile__title",
  selectorAvatar: ".profile__avatar-picture",
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
    renderer: createCard,
  },
  ".elements"
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([info, initialCards]) => {
    userInfo.setUserInfo(info);
    render.renderer(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

buttonOpenPopupCard.addEventListener("click", handleOpenCardPopup);
buttonOpenPopupProfile.addEventListener("click", handleOpenProfilePopup);
buttonOpenPopupAvatar.addEventListener("click", handleOpenAvatarPopup);