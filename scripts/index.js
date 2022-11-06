const nameTitle = document.querySelector(".profile__title");
const jobTitle = document.querySelector(".profile__subtitle");
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card").content;
const cardTemplateElement = cardTemplate.querySelector(".element");
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
const popupPicture = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__text");

const openPopup = (popup) => {
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
    cardsContainer.append(createCard(cardData));
  });
};

const handleLikeClick = (button) => {
  button.classList.toggle("element__button_active");
};

const handleDeleteCard = (card) => {
  card.remove();
};

const handleOpenCardPopup = () => {
  cardForm.reset();
  hideInputError(cardForm, inputTitleCardForm, {inputErrorClass: "form__text_error",errorClass: "error_open"});
  hideInputError(cardForm, inputLinkCardForm, {inputErrorClass: "form__text_error",errorClass: "error_open"});
  setButtonState(buttonSubmitCardForm, false);
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
  cardsContainer.prepend(createCard(cardData));
  closePopup(cardPopup);
};

const closePopupProfileHandler = () => {
  closePopup(profilePopup);
};

const createCard = (cardData) => {
  const cardElement = cardTemplateElement.cloneNode(true);
  const likeButton = cardElement.querySelector(".element__button");
  const deleteButton = cardElement.querySelector(".element__delete");

  const cardImage = cardElement.querySelector(".element__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".element__text").textContent = cardData.name;

  likeButton.addEventListener("click", () => handleLikeClick(likeButton));
  deleteButton.addEventListener("click", () => handleDeleteCard(cardElement));
  cardImage.addEventListener("click", () => handlePreviewPicture(cardData));

  return cardElement;
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  nameTitle.textContent = inputNameProfileForm.value;
  jobTitle.textContent = inputJobProfileForm.value;
  closePopup(profilePopup);
};


const handleOpenProfilePopup = () => {
  inputNameProfileForm.value = nameTitle.textContent;
  hideInputError(profileForm, inputNameProfileForm, {inputErrorClass: "form__text_error",errorClass: "error_open"});
  inputJobProfileForm.value = jobTitle.textContent;
  hideInputError(profileForm, inputJobProfileForm, {inputErrorClass: "form__text_error",errorClass: "error_open"});
  setButtonState(buttonSubmitProfileForm, true);
  openPopup(profilePopup);
};

const closeImage = () => {
  closePopup(popupImage);
};

const handlePreviewPicture = (cardData) => {
  popupPicture.src = cardData.link;
  popupPicture.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(popupImage);
};

renderInitialCards();

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__text",
  submitButtonSelector: ".form__button",
  inputErrorClass: "form__text_error",
  errorClass: "error_open",
});

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
