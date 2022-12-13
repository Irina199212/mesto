export default class Card {
  constructor(
    cardData,
    templateSelector,
    handleCardClick,
    currentUser,
    handleRemoveCardClick,
    handleSetLikeCard,
    handleRemoveLikeCard
  ) {
    this._name = cardData.name;
    this._currentUser = currentUser;
    this._link = cardData.link;
    this._id = cardData._id;
    this._owner = cardData.owner;
    this._likes = cardData.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCardClick = handleRemoveCardClick;
    this._handleSetLikeCardClick = handleSetLikeCard;
    this._handleRemoveLikeCardClick = handleRemoveLikeCard;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeClick());
    if (this._owner._id == this._currentUser._id) {
      this._deleteButton.addEventListener("click", () =>
        this._handleRemoveCardClick(this._id)
      );
    }
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
    if (this._likeButton.classList.contains("element__button_active")) {
      this._handleRemoveLikeCardClick(
        this._id,
        this._likeButton,
        this._counterLikes
      );
    } else {
      this._handleSetLikeCardClick(
        this._id,
        this._likeButton,
        this._counterLikes
      );
    }
  };

  _handleDeleteCard = () => {
    this._element.remove();
  };

  createCard() {
    this._element = this._getTemplate();
    this._element.id = `card-${this._id}`;
    this._cardImage = this._element.querySelector(".element__image");
    this._cardText = this._element.querySelector(".element__text");
    this._likeButton = this._element.querySelector(".element__button");
    this._deleteButton = this._element.querySelector(".element__delete");
    this._counterLikes = this._element.querySelector(".element__counter-like");
    if (this._owner._id != this._currentUser._id) {
      this._deleteButton.remove();
    }

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    if (this._likes.length > 0) {
      this._likes.forEach((like) => {
        if (like._id == this._currentUser._id) {
          this._likeButton.classList.add("element__button_active");
        }
      });
    }
    this._counterLikes.textContent = this._likes.length;
    return this._element;
  }
}
