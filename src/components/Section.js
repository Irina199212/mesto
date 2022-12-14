export default class Section {
  constructor(param, selector) {
    this._renderer = param.renderer;
    this._selector = selector;
    this._container = document.querySelector(this._selector);
  }

  renderer(items) {
    items.forEach((cardData) => {
      this._container.append(this._renderer(cardData));
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
