const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

const profileInfo = {
  "name": profile.querySelector('.profile__name'),
  "description": profile.querySelector('.profile__description')
};

const profileEditButton = profile.querySelector('.profile__edit-button');
const addNewCardButton = profile.querySelector('.profile__add-button');

const cardTemplate = document.querySelector('#card').content;
const elementsList = document.querySelector('.elements__list');

// Popup handlers
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(evt) {
  const openedPopup = evt.target.closest('.popup');
  openedPopup.classList.remove('popup_opened');

  resetPopup(openedPopup);
}

function resetPopup(popup) {
  const popupForm = popup.querySelector('.popup__form');
  const popupInputs = Array.from(popup.querySelectorAll('.popup__input'));
  const submitButton = popupForm.querySelector('.popup__submit-button');

  resetPopupErrors(popupInputs, popupForm);
  resetPopupForm(popupForm);
  //toggleButtonState(popupInputs, submitButton);
}

function resetPopupErrors(popupInputs, popupForm) {
  popupInputs.forEach(input => {
    hideInputError(popupForm, input);
  });
}

function resetPopupForm(popupForm) {
  popupForm.reset();
}

// Form handlers
function saveProfileInfo(evt) {
  evt.preventDefault();
  profileInfo.name.textContent = profileName.value;
  profileInfo.description.textContent = profileDescription.value;
  closePopup(evt);
}

function addNewCard(evt) {
  evt.preventDefault();

  const card = {
    'name': elementName.value,
    'link': elementLink.value
  };

  renderNewCard(card);
  resetPopupForm(addNewCardForm);
  closePopup(evt);
}

// Profile handlers
function renderProfileInfo() {
  profileName.value = profileInfo.name.textContent;
  profileDescription.value = profileInfo.description.textContent;
}

// Cards handlers
function createCard(card) {
  const newCard = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const cardImage = newCard.querySelector('.elements__image');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  newCard.querySelector('.elements__title').textContent = card.name;

  newCard.querySelector('.elements__image').addEventListener('click', enlargeCard);
  newCard.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
  newCard.querySelector('.elements__like-button').addEventListener('click', likeCard);

  return newCard;
}

function renderNewCard(card) {
  const newCard = createCard(card);
  elementsList.prepend(newCard);
}

function deleteCard(evt) {
  const card = evt.target.closest('.elements__item');
  card.remove();
}

function enlargeCard(evt) {
  popupCardName.textContent = evt.target.nextElementSibling.querySelector('.elements__title').textContent;
  popupCardImage.src = evt.target.src;
  popupCardImage.alt = popupCardName.textContent;

  openPopup(popupCard);
}

function likeCard(evt) {
  evt.target.classList.toggle('elements__like-button_type_active');
}

// Render initial cards
initialCards.forEach(card => {
  renderNewCard(card);
});

// Forms validation
function showInputError(form, input, errorMessage) {
  input.classList.add('popup__input_type_error');
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = errorMessage;
  error.classList.add('popup__input-error_active');
}

function hideInputError(form, input) {
  input.classList.remove('popup__input_type_error');
  const error = form.querySelector(`.${input.id}-error`);
  error.classList.remove('popup__input-error_active');
  error.textContent = '';
}

function checkInputValidity(input, form) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input, input.validationMessage);
  }
}

function hasInvalidInputs(inputs) {
  return inputs.some(input => !input.validity.valid);
}

function toggleButtonState(inputs, button) {
  if (hasInvalidInputs(inputs)) {
    button.classList.add('popup__submit-button_inactive');
  } else {
    button.classList.remove('popup__submit-button_inactive');
  }
}

function setFormEventListeners(form) {
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  const submitButton = form.querySelector('.popup__submit-button');

  //toggleButtonState(inputs, submitButton);

  inputs.forEach(input => {
    input.addEventListener('input', function() {
      checkInputValidity(input, form);
      //toggleButtonState(inputs, submitButton);
    });
  });
};

function enableValidation() {
  const forms = Array.from(document.querySelectorAll('.popup__form'));
  forms.forEach(form => {
    setFormEventListeners(form);
  });
};

// Validate forms
enableValidation();

// Buttons listeners
profileEditButton.addEventListener('click', function() {
  renderProfileInfo();
  openPopup(profilePopup);
});

addNewCardButton.addEventListener('click', function() {
  openPopup(addPopup);
});

// Popup listeners
popups.forEach(popup => {
  const popupCloseButton = popup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', closePopup);
})

// Forms listeners
editProfilePopupForm.addEventListener('submit', saveProfileInfo);
addNewCardForm.addEventListener('submit', addNewCard);



