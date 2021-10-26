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

/*** POPUPS ***/
const popups = document.querySelectorAll('.popup');

popups.forEach(popup => {
  const popupCloseButton = popup.querySelector('.popup__close-button');
  console.log(popupCloseButton);
  popupCloseButton.addEventListener('click', closePopup);
})

const editProfilePopupForm = document.querySelector('.popup__form_type_edit-profile');
editProfilePopupForm.addEventListener('submit', saveProfileInfo);

const addNewCardForm = document.querySelector('.popup__form_type_add-new-element');
addNewCardForm.addEventListener('submit', addNewCard);

// Popup handlers
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(evt) {
  const openedPopup = evt.target.closest('.popup');
  openedPopup.classList.remove('popup_opened');
}

// Form handlers
const profileName = document.querySelector('.popup__input_type_profile-name');
const profileDescription = document.querySelector('.popup__input_type_profile-description');

function saveProfileInfo(evt) {
  evt.preventDefault();
  profileInfo.name.textContent = profileName.value;
  profileInfo.description.textContent = profileDescription.value;
  closePopup(evt);
}

const elementName = document.querySelector('.popup__input_type_element-name');
const elementLink = document.querySelector('.popup__input_type_element-link');

function addNewCard(evt) {
  evt.preventDefault();

  const card = {
    'name': elementName.value,
    'link': elementLink.value
  };

  renderNewCard(card);

  elementName.value = '';
  elementLink.value = '';

  closePopup(evt);
}

/*** PROFILE ***/
const profile = document.querySelector('.profile');

const profileInfo = {
  "name": profile.querySelector('.profile__name'),
  "description": profile.querySelector('.profile__description')
};

const profileEditButton = profile.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit-profile');

profileEditButton.addEventListener('click', function() {
  renderProfileInfo();
  openPopup(profilePopup);
});

// Profile handlers
function renderProfileInfo() {
  profileName.value = profileInfo.name.textContent;
  profileDescription.value = profileInfo.description.textContent;
}

/*** CARDS ***/
const cardTemplate = document.querySelector('#card').content;
const elementsList = document.querySelector('.elements__list');

// render initial cards
initialCards.forEach(card => {
  renderNewCard(card);
});

// cards handlers
function createCard(card) {
  const newCard = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const cardImage = newCard.querySelector('.elements__image');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  newCard.querySelector('.elements__title').textContent = card.name;

  return newCard;
}

function renderNewCard(card) {
  const newCard = createCard(card);

  newCard.querySelector('.elements__image').addEventListener('click', enlargeCard);
  newCard.querySelector('.elements__delete-button').addEventListener('click', deleteCard);
  newCard.querySelector('.elements__like-button').addEventListener('click', likeCard);

  elementsList.prepend(newCard);
}

function deleteCard(evt) {
  const card = evt.target.closest('.elements__item');
  card.remove();
}

const popupCard = document.querySelector('.popup_type_image');
const popupCardName = popupCard.querySelector('.popup__caption');
const popupCardImage = popupCard.querySelector('.popup__image');

function enlargeCard(evt) {
  popupCardName.textContent = evt.target.nextElementSibling.querySelector('.elements__title').textContent;
  popupCardImage.src = evt.target.src;
  popupCardImage.alt = popupCardName.textContent;

  openPopup(popupCard);
}

function likeCard(evt) {
  evt.target.classList.toggle('elements__like-button_type_active');
}

// Add new card button
const addNewCardButton = profile.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add-new-element');

addNewCardButton.addEventListener('click', function() {
  openPopup(addPopup);
});



