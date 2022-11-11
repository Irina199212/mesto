import { openPopup } from "./index.js";
export default class Card {
  constructor(param, templateSelector) {
    this._name = param.name;
    this._link = param.link;
    this._templateSelector = templateSelector;
  }
  _setEventListeners() {
    this._element
      .querySelector(".element__button")
      .addEventListener("click", () => this._handleLikeClick());

    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => this._handleDeleteCard());
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => this._handlePreviewPicture());
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeClick = () => {
    this._element
      .querySelector(".element__button")
      .classList.toggle("element__button_active");
  };

  _handleDeleteCard = () => {
    this._element.remove();
  };

  _handlePreviewPicture = () => {
    const popupImage = document.querySelector(".popup_image");
    const popupPicture = popupImage.querySelector(".popup__image");
    const popupCaption = popupImage.querySelector(".popup__text");
    popupPicture.src = this._link;
    popupPicture.alt = this._name;
    popupCaption.textContent = this._name;
    openPopup(popupImage);
  };

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__text").textContent = this._name;

    return this._element;
  }
}
