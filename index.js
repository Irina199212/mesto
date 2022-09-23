const pupupOpenButton = document.querySelector(".info__button");
const pupup = document.querySelector(".popup");
const pupupCloseButton = pupup.querySelector(".popup__close");

const formElement = document.querySelector(".form");
const nameInput = document.querySelector("#nameForm");
const jobInput = document.querySelector("#jobForm");
const nameTitle = document.querySelector(".info__title");
const jobTitle = document.querySelector(".info__subtitle");

nameInput.value = nameTitle.textContent;
jobInput.value = jobTitle.textContent;

function popupToggle() {
  pupup.classList.toggle("popup_opened");
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
