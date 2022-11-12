export default class Card {
  constructor(param, templateSelector, handleCardClick) {
    this._name = param.name;
    this._link = param.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeClick());

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeClick = () => {
    this._likeButton.classList.toggle("element__button_active");
  };

  _handleDeleteCard = () => {
    this._element.remove();
  };

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardText = this._element.querySelector(".element__text");
    this._likeButton = this._element.querySelector(".element__button");
    this._deleteButton = this._element.querySelector(".element__delete");

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    return this._element;
  }
}
