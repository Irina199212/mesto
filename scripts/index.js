const pupupOpenButton = document.querySelector(".profile__button-edit");
const pupup = document.querySelector(".popup");
const pupupCloseButton = pupup.querySelector(".popup__close");

const formElement = document.querySelector(".form");
const nameInput = document.querySelector(".form__text_name_name");
const jobInput = document.querySelector(".form__text_name_post");
const nameTitle = document.querySelector(".profile__title");
const jobTitle = document.querySelector(".profile__subtitle");

function popupToggle() {
  if (pupup.classList.contains("popup_opened")) {
    pupup.classList.remove("popup_opened");
  } else {
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobTitle.textContent;
    pupup.classList.add("popup_opened");
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
pupupOpenButton.addEventListener("click", popupToggle);
pupupCloseButton.addEventListener("click", popupToggle);
