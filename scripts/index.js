const nameTitle = document.querySelector(".profile__title");
const jobTitle = document.querySelector(".profile__subtitle");

const cards = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card").content;

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

const closePopupHandler = (event) => {
  if (event.keyCode == 27) {
    closePopup(profilePopup);
    closePopup(cardPopup);
    closePopup(popupImage);
  }
};

const overlayHandler = (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
};

const render = () => {
  initialCards.forEach((item) => {
    cards.append(createCard(item));
  });

  buttonOpenPopupCard.addEventListener("click", addCardPopupHandler);
  buttonOpenPopupProfile.addEventListener("click", profilePopupHandler);

  cardForm.addEventListener("submit", addCardPopupFormSubmitHandler);
  profileForm.addEventListener("submit", profileFormSubmitHandler);
  document.addEventListener("keydown", closePopupHandler);

  profilePopup.addEventListener("click", overlayHandler);
  cardPopup.addEventListener("click", overlayHandler);
  popupImage.addEventListener("click", overlayHandler);

  enableValidation({
    formSelector: "form[name='profile-form']",
  });

  enableValidation({
    formSelector: "form[name='add-card-form']",
  });

  buttonClosePopupProfile.addEventListener("click", closePopupProfileHandler);
  buttonClosePopupCard.addEventListener("click", closePopupCardHandler);

  buttonClosePopupImage.addEventListener("click", closeImage);
};

const likeHandler = (evt) => {
  evt.target.classList.toggle("element__button_active");
};

const deleteHandler = (evt) => {
  const currentCard = evt.target.closest(".element");
  currentCard.remove();
};

const addCardPopupHandler = () => {
  cardForm.reset();
  openPopup(cardPopup);
};
const closePopupCardHandler = () => {
  closePopup(cardPopup);
};

const addCardPopupFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const item = {
    name: inputTitleCardForm.value,
    link: inputLinkCardForm.value,
  };
  cards.prepend(createCard(item));
  closePopup(cardPopup);
};

const closePopupProfileHandler = () => {
  closePopup(profilePopup);
};

const createCard = (item) => {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const likeButton = cardElement.querySelector(".element__button");
  const deleteButton = cardElement.querySelector(".element__delete");

  const openImageLink = cardElement.querySelector(".image__link");
  openImageLink.href = item.link;
  openImageLink.title = item.name;
  openImageLink.addEventListener("click", openImageHandler);

  cardElement.querySelector(".element__image").src = item.link;
  cardElement.querySelector(".element__image").alt = item.name;
  cardElement.querySelector(".element__text").textContent = item.name;

  likeButton.addEventListener("click", likeHandler);
  deleteButton.addEventListener("click", deleteHandler);

  return cardElement;
};

const profileFormSubmitHandler = (evt) => {
  evt.preventDefault();
  nameTitle.textContent = inputNameProfileForm.value;
  jobTitle.textContent = inputJobProfileForm.value;
  closePopup(profilePopup);
};

const profilePopupHandler = () => {
  inputNameProfileForm.value = nameTitle.textContent;
  inputJobProfileForm.value = jobTitle.textContent;
  openPopup(profilePopup);
};

const openImage = () => {
  popupImage.classList.add("popups_active");
};

const closeImage = () => {
  popupPicture.src = "./";
  popupPicture.alt = "...";
  popupCaption.textContent = "...";
  closePopup(popupImage);
};

const openImageHandler = (evt) => {
  evt.preventDefault();
  const current = evt.target;

  popupPicture.src = current.src;
  popupPicture.alt = current.alt;
  popupCaption.textContent = current.alt;
  openPopup(popupImage);
};

render();
