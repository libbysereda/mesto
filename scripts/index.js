import { initialCards } from './initialCards.js';
import { validationConfig } from './validationConfig.js';
import { openPopup, closePopup, closeByClickHandler } from './utils.js';

import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popups = document.querySelectorAll('.popup');

const profilePopup = document.querySelector('.popup_type_edit-profile');
const addPopup = document.querySelector('.popup_type_add-new-element');

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
  editFormValidator.resetValidation();
  renderProfileInfo();
  editFormValidator.setSubmitButtonState();
  openPopup(profilePopup);
});

addNewCardButton.addEventListener('click', function() {
  addFormValidator.resetValidation();
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

const editFormValidator = new FormValidator(validationConfig, editProfilePopupForm);
const addFormValidator = new FormValidator(validationConfig, addNewCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
