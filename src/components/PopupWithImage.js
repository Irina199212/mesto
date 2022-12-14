import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupPicture = this._popupElement.querySelector(".popup__image");
    this._popupCaption = this._popupElement.querySelector(".popup__text");
  }
  open(name, link) {
    super.open();
    this._popupPicture.src = link;
    this._popupPicture.alt = name;
    this._popupCaption.textContent = name;
  }
}
