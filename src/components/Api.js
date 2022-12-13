export default class Api {
  constructor(options) {
    this._cardsUrl = options.cardsUrl;
    this._userInfoUrl = options.userInfoUrl;
    this._userInfoUpdateUrl = options.userInfoUpdateUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._cardsUrl}`, {
      headers: this._headers,
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addCard(cardData) {
    return fetch(`${this._cardsUrl}`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name: cardData.name, link: cardData.link }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  removeCard(id) {
    return fetch(`${this._cardsUrl}/${id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setLikeCard(id) {
    return fetch(`${this._cardsUrl}/${id}/likes `, {
      headers: this._headers,
      method: "PUT",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  removeLikeCard(id) {
    return fetch(`${this._cardsUrl}/${id}/likes `, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this._userInfoUrl}`, {
      headers: this._headers,
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateUserInfo(userInfo) {
    return fetch(`${this._userInfoUpdateUrl}`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ name: userInfo.name, about: userInfo.post }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  updateUserAvatar(userInfo) {
    return fetch(`${this._userInfoUpdateUrl}/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: userInfo.avatar}),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
