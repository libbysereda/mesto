import { initialCards } from './initialCards.js';
console.log(initialCards);

const popups = document.querySelectorAll('.popup');

const profilePopup = document.querySelector('.popup_type_edit-profile');
const addPopup = document.querySelector('.popup_type_add-new-element');
const popupCard = document.querySelector('.popup_type_image');
const popupCardName = popupCard.querySelector('.popup__caption');
const popupCardImage = popupCard.querySelector('.popup__image');

const editProfilePopupForm = document.querySelector('.popup__form_type_edit-profile');
const addNewCardForm = document.querySelector('.popup__form_type_add-new-element');

const profileName = document.querySelector('.popup__input_type_profile-name');
const profileDescription = document.querySelector('.popup__input_type_profile-description');

const elementName = document.querySelector('.popup__input_type_element-name');
const elementLink = document.querySelector('.popup__input_type_element-link');

const profile = document.querySelector('.profile');

const profileEditButton = profile.querySelector('.profile__edit-button');
const addNewCardButton = profile.querySelector('.profile__add-button');

const elementsList = document.querySelector('.elements__list');

const profileInfo = {
  name: profile.querySelector('.profile__name'),
  description: profile.querySelector('.profile__description')
};

// Popup handlers
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscapeHandler);
}

function closePopup() {
  const openedPopup = document.querySelector('.popup_opened');
  openedPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscapeHandler);
}

function closeByClickHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
}

function closeByEscapeHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

// Form handlers
function saveProfileInfo(evt) {
  profileInfo.name.textContent = profileName.value;
  profileInfo.description.textContent = profileDescription.value;

  closePopup();
}

function addNewCard(evt) {
  const card = {
    name: elementName.value,
    link: elementLink.value
  };

  renderNewCard(card);
  closePopup();
}

// Profile handlers
function renderProfileInfo() {
  profileName.value = profileInfo.name.textContent;
  profileDescription.value = profileInfo.description.textContent;
}

class Card {
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


// Cards handlers
function renderNewCard(card) {
  const newCard = new Card(card, '#card');
  const cardElement = newCard.createCard();

  elementsList.prepend(cardElement);
}

// Render initial cards
initialCards.forEach(card => {
  renderNewCard(card);
});

// Buttons listeners
profileEditButton.addEventListener('click', function() {
  resetValidation(editProfilePopupForm, validationConfig);
  renderProfileInfo();
  setSubmitButtonState(editProfilePopupForm, validationConfig);
  openPopup(profilePopup);
});

addNewCardButton.addEventListener('click', function() {
  resetValidation(addNewCardForm, validationConfig);
  openPopup(addPopup);
});

// Popup listeners
popups.forEach(popup => {
  popup.addEventListener('mouseup', closeByClickHandler);
  const popupCloseButton = popup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', closePopup);

})

// Forms listeners
editProfilePopupForm.addEventListener('submit', saveProfileInfo);
addNewCardForm.addEventListener('submit', addNewCard);



