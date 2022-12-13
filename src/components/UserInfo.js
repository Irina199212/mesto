export default class Section {
  constructor(param) {
    this._selectorName = param.selectorName;
    this._selectorAvatar = param.selectorAvatar;
    this._selectorDescription = param.selectorDescription;
    this._nameElement = document.querySelector(this._selectorName);
    this._avatarElement = document.querySelector(this._selectorAvatar);
    this._descriptionElement = document.querySelector(
      this._selectorDescription
    );
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
      _id : this._userId,
      avatar : this.userAvatar,
    };
  }

  setUserInfo(userInfo) {

    this.userName = userInfo.name;
    this.userAbout = userInfo.about;
    this.userAvatar = userInfo.avatar;
    this._userId = userInfo._id;

    this._nameElement.textContent = this.userName;
    this._descriptionElement.textContent = this.userAbout;
    this._avatarElement.src = this.userAvatar;
    this._avatarElement.alt = this.userName;
  }
}
