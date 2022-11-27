export default class Section {
  constructor(param) {
    this._selectorName = param.selectorName;
    this._selectorDescription = param.selectorDescription;
    this._nameElement = document.querySelector(this._selectorName);
    this._descriptionElement = document.querySelector(
      this._selectorDescription
    );
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo(name, description) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}
