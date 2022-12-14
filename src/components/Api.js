export default class Api {
  constructor(options) {
    this._cardsUrl = options.cardsUrl;
    this._userInfoUrl = options.userInfoUrl;
    this._userInfoUpdateUrl = options.userInfoUpdateUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._cardsUrl}`, {
      headers: this._headers,
      method: "GET",
    }).then((res) => this._getResponseData(res));
  }

  addCard(cardData) {
    return fetch(`${this._cardsUrl}`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name: cardData.name, link: cardData.link }),
    }).then((res) => this._getResponseData(res));
  }

  removeCard(id) {
    return fetch(`${this._cardsUrl}/${id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._getResponseData(res));
  }

  setLikeCard(id) {
    return fetch(`${this._cardsUrl}/${id}/likes `, {
      headers: this._headers,
      method: "PUT",
    }).then((res) => this._getResponseData(res));
  }

  removeLikeCard(id) {
    return fetch(`${this._cardsUrl}/${id}/likes `, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._getResponseData(res));
  }

  getUserInfo() {
    return fetch(`${this._userInfoUrl}`, {
      headers: this._headers,
      method: "GET",
    }).then((res) => this._getResponseData(res));
  }

  updateUserInfo(userInfo) {
    return fetch(`${this._userInfoUpdateUrl}`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ name: userInfo.name, about: userInfo.post }),
    }).then((res) => this._getResponseData(res));
  }
  updateUserAvatar(userInfo) {
    return fetch(`${this._userInfoUpdateUrl}/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: userInfo.avatar }),
    }).then((res) => this._getResponseData(res));
  }
}
