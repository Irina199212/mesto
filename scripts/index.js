const popupOpenButton = document.querySelector(".profile__button-edit");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close");

const formElement = document.querySelector(".form");
const nameInput = document.querySelector(".form__text_name_name");
const jobInput = document.querySelector(".form__text_name_post");
const nameTitle = document.querySelector(".profile__title");
const jobTitle = document.querySelector(".profile__subtitle");

function popupToggle() {
  if (popup.classList.contains("popup_opened")) {
    popup.classList.remove("popup_opened");
  } else {
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobTitle.textContent;
    popup.classList.add("popup_opened");
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  let name = nameInput.value;
  let job = jobInput.value;

  nameTitle.textContent = name;
  jobTitle.textContent = job;
  popupToggle();
}

formElement.addEventListener("submit", formSubmitHandler);
popupOpenButton.addEventListener("click", popupToggle);
popupCloseButton.addEventListener("click", popupToggle);
