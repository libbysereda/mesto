import { popupCard, popupCardImage, popupCardName, openPopup } from "./index.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

      return cardElement;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._enlargeCard();
    });

    this._card.querySelector('.elements__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });

    this._card.querySelector('.elements__like-button').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
  }

  _enlargeCard() {
    popupCardName.textContent = this._name;
    popupCardImage.src = this._link;
    popupCardImage.alt = this._name;

    openPopup(popupCard);
  }

  _deleteCard() {
    this._card.remove();
  }

  _likeCard(evt) {
    evt.target.classList.toggle('elements__like-button_type_active');
  }

  createCard() {
    this._card = this._getTemplate();

    this._cardImage = this._card.querySelector('.elements__image');
    this._cardTitle = this._card.querySelector('.elements__title');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
}
