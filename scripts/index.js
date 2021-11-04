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

const profileEditButton = profile.querySelector('.profile__edit-button');
const addNewCardButton = profile.querySelector('.profile__add-button');

const cardTemplate = document.querySelector('#card').content;
const elementsList = document.querySelector('.elements__list');

const profileInfo = {
  name: profile.querySelector('.profile__name'),
  description: profile.querySelector('.profile__description')
};

// forms validation
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  errorMessageClass: 'popup__input-error_active',
  errorInputClass: 'popup__input_type_error',
  submitButtonDisabledClass: 'popup__submit-button_inactive'
};

// Popup handlers
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(evt) {
  const openedPopup = evt.target.closest('.popup');
  openedPopup.classList.remove('popup_opened');

  resetForm(openedPopup, validationConfig);
}

function resetForm(popup, config) {
  const form = popup.querySelector(config.formSelector);
  form.reset();

  const inputs = [...popup.querySelectorAll(config.inputSelector)];

  resetInputsErrors(inputs, form, config);

  setSubmitButtonState(form, config);
}

function resetInputsErrors(inputs, form, config) {
  inputs.forEach(input => {
    hideInputError(input, form, config);
  })
}

// Form handlers
function saveProfileInfo(evt) {
  profileInfo.name.textContent = profileName.value;
  profileInfo.description.textContent = profileDescription.value;
  closePopup(evt);
}

function addNewCard(evt) {
  const card = {
    'name': elementName.value,
    'link': elementLink.value
  };

  renderNewCard(card);
  closePopup(evt);
}

// Profile handlers
function renderProfileInfo() {
  profileName.value = profileInfo.name.textContent;
  profileDescription.value = profileInfo.description.textContent;
  setSubmitButtonState(editProfilePopupForm, validationConfig);
}

// Cards handlers
function createCard(card) {
  const newCard = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const cardImage = newCard.querySelector('.elements__image');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  newCard.querySelector('.elements__title').textContent = card.name;

  newCard.addEventListener('click', (evt) => {
    enlargeCard(evt, newCard);
    deleteCard(evt, newCard);
    likeCard(evt);
  });

  return newCard;
}

function renderNewCard(card) {
  const newCard = createCard(card);
  elementsList.prepend(newCard);
}

function deleteCard(evt, card) {
  if (evt.target.classList.contains('elements__delete-button')) {
    card.remove();
  }
}

function enlargeCard(evt, card) {
  if (evt.target.classList.contains('elements__image')) {
    const imageTitle = card.querySelector('.elements__title');

    popupCardName.textContent = imageTitle.textContent;
    popupCardImage.src = evt.target.src;
    popupCardImage.alt = imageTitle.textContent;

    openPopup(popupCard);
  }

}

function likeCard(evt) {
  if (evt.target.classList.contains('elements__like-button')) {
    evt.target.classList.toggle('elements__like-button_type_active');
  }
}

// Render initial cards
initialCards.forEach(card => {
  renderNewCard(card);
});

// Forms validation
function validateForms(config) {
  const forms = [...document.querySelectorAll(config.formSelector)];

  forms.forEach(form => setFormListeners(form, config));
}

function setFormListeners(form, config) {
  form.addEventListener('submit', handleSubmit);

  form.addEventListener('input', () => {
    setSubmitButtonState(form, config);
  });

  const inputs = [...form.querySelectorAll(config.inputSelector)];

  inputs.forEach(input => {
    input.addEventListener('input', () => isInputValid(input, form, config));
  });

  setSubmitButtonState(form, config);
}

function handleSubmit(evt) {
  evt.preventDefault();
}

function isInputValid(input, form, config) {
  if (input.validity.valid) {
    hideInputError(input, form, config);
  } else {
    showInputError(input, form, config);
  }
}

function hideInputError(input, form, config) {
  const errorMessage = form.querySelector(`#${input.id}-error`);
  errorMessage.textContent = '';
  errorMessage.classList.remove(config.errorMessageClass);
  input.classList.remove(config.errorInputClass);
}

function showInputError(input, form, config) {
  const errorMessage = form.querySelector(`#${input.id}-error`);
  errorMessage.textContent = input.validationMessage;
  errorMessage.classList.add(config.errorMessageClass);
  input.classList.add(config.errorInputClass);
}

function setSubmitButtonState(form, config) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  submitButton.disabled = !form.checkValidity();
  submitButton.classList.toggle(config.submitButtonDisabledClass, !form.checkValidity());
}

// Validate forms
validateForms(validationConfig);

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



