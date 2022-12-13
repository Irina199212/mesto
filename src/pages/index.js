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
  submitText: "Сохранить",
  submitingText: "Сохранение...",
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
const inputLinkAvatarForm = avatarForm.querySelector(".form__text_name_link");
const submitButtonAvatarForm = avatarForm.querySelector(
  formData.submitButtonSelector
);

const buttonOpenPopupProfile = document.querySelector(".profile__button-edit");
const profileForm = document.forms["profile-form"];
const inputNameProfileForm = profileForm.querySelector(".form__text_name_name");
const inputJobProfileForm = profileForm.querySelector(".form__text_name_post");

const cardForm = document.forms["add-card-form"];

const submitButtonProfileForm = profileForm.querySelector(
  formData.submitButtonSelector
);
const submitButtonCardForm = cardForm.querySelector(
  formData.submitButtonSelector
);

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
  submitButtonCardForm.value = formData.submitingText;
  api
    .addCard(cardData)
    .then((res) => {
      render.addItem(createCard(res));
      submitButtonCardForm.value = formData.submitText;
    })
    .catch((err) => {
      console.log(err);
    });
  cardPopup.close();
};

const handleProfileFormSubmit = (userData) => {
  submitButtonProfileForm.value = formData.submitingText;
  api
    .updateUserInfo(userData)
    .then((res) => {
      userInfo.setUserInfo(res);
      submitButtonProfileForm.value = formData.submitText;
    })
    .catch((err) => {
      console.log(err);
    });
  profilePopup.close();
};

const avatarPopupFormSubmitHandler = (userData) => {
  submitButtonAvatarForm.value = formData.submitingText;
  api
    .updateUserAvatar(userData)
    .then((res) => {
      userInfo.setUserInfo(res);
      submitButtonAvatarForm.value = formData.submitText;
    })
    .catch((err) => {
      console.log(err);
    });
  avatarPopup.close();
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

function handleCardRemoveFormSubmit(id) {
  api
    .removeCard(id)
    .then(() => {
      document.querySelector(`#card-${id}`).remove();
      cardRemovePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleSetLikeCard(id, likeButton, likeCounter) {
  api
    .setLikeCard(id)
    .then((res) => {
      likeCounter.textContent = res.likes.length;
      likeButton.classList.add("element__button_active");
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleRemoveLikeCard(id, likeButton, likeCounter) {
  api
    .removeLikeCard(id)
    .then((res) => {
      likeCounter.textContent = res.likes.length;
      likeButton.classList.remove("element__button_active");
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
  const userData = userInfo.getUserInfo();
  inputLinkAvatarForm.value = userData.avatar;
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
api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res);
    api
      .getInitialCards()
      .then((res) => {
        render.renderer(res);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

buttonOpenPopupCard.addEventListener("click", handleOpenCardPopup);
buttonOpenPopupProfile.addEventListener("click", handleOpenProfilePopup);

buttonOpenPopupAvatar.addEventListener("click", handleOpenAvatarPopup);
