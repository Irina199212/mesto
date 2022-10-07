const popup = document.querySelector(".popup");
const popupContainer = popup.querySelector(".popup__container");
const popupCloseButton = popup.querySelector(".popup__close");

const popupImage = document.querySelector(".popups");
const popupImageContainer = popupImage.querySelector(".popups__container");
const popupImageCloseButton = popupImage.querySelector(".popups__close");

const cards = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card").content;

const addCardButton = document.querySelector(".profile__button-add");
const editeProfileButton = document.querySelector(".profile__button-edit");

const nameTitle = document.querySelector(".profile__title");
const jobTitle = document.querySelector(".profile__subtitle");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const openPopup = () => {
  popup.classList.add("popup_opened");
};

const closePopup = () => {
  popup.classList.remove("popup_opened");
  const popupForm = popupContainer.querySelector("form");
  popupForm.remove();
};

const render = () => {
  initialCards.forEach((item) => {
    cards.append(createCard(item));
  });

  addCardButton.addEventListener("click", addCardPopupHandler);
  editeProfileButton.addEventListener("click", editeProfilePopupHandler);
  popupCloseButton.addEventListener("click", closePopup);


  popupImageCloseButton.addEventListener("click", closeImage);
};

const editeProfilePopupHandler = () => {
  const editeProfilePopupFormTemplate =
    document.querySelector("#profile-form").content;
  const editeProfilePopupForm = editeProfilePopupFormTemplate
    .querySelector("form")
    .cloneNode(true);

  editeProfilePopupForm.querySelector(".form__text_name_name").value =
    nameTitle.textContent;
  editeProfilePopupForm.querySelector(".form__text_name_post").value =
    jobTitle.textContent;

  editeProfilePopupForm.addEventListener(
    "submit",
    editeProfileFormSubmitHandler
  );

  popupContainer.append(editeProfilePopupForm);
  openPopup();
};

const editeProfileFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const currentForm = evt.target.closest("form");
  nameTitle.textContent = currentForm.querySelector(
    ".form__text_name_name"
  ).value;
  jobTitle.textContent = currentForm.querySelector(
    ".form__text_name_post"
  ).value;

  closePopup();
};

const addCardPopupHandler = () => {
  const addCardPopupFormTemplate = document.querySelector("#add-card").content;
  const addCardPopupForm = addCardPopupFormTemplate
    .querySelector("form")
    .cloneNode(true);
  addCardPopupForm.querySelector(".form__text_name_name").value = "";
  addCardPopupForm.querySelector(".form__text_name_link").value = "";

  addCardPopupForm.addEventListener("submit", addCardPopupFormSubmitHandler);

  popupContainer.append(addCardPopupForm);
  openPopup();
};

const addCardPopupFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const currentForm = evt.target.closest("form");

  const item = {
    name: currentForm.querySelector(".form__text_name_name").value,
    link: currentForm.querySelector(".form__text_name_link").value,
  };

  cards.append(createCard(item));

  closePopup();
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

const openImage = () => {
  popupImage.classList.add("popups_active");
};

const closeImage = () => {
  popupImage.classList.remove("popups_active");
  const image = popupImageContainer.querySelector(".figure");
  image.remove();
};

const openImageHandler = (evt) => {
  evt.preventDefault();
  const current = evt.target;
  const showImagePopupTemplate = document.querySelector("#image-form").content;
  const showImagePopup = showImagePopupTemplate
    .querySelector(".figure")
    .cloneNode(true);

  showImagePopup.querySelector(".popups__images").src = current.src;
  showImagePopup.querySelector(".popups__images").alt = current.alt;
  showImagePopup.querySelector(".popups__text").textContent = current.alt;

  popupImageContainer.append(showImagePopup);

  openImage();
};

const likeHandler = (evt) => {
  const current = evt.target;
  if (current.classList.contains("element__button_active")) {
    current.classList.remove("element__button_active");
  } else {
    current.classList.add("element__button_active");
  }
};

const deleteHandler = (evt) => {
  const currentCard = evt.target.closest(".element");
  currentCard.remove();
};

render();
