// Get DOM elements for profile editing

const profile = document.querySelector('.profile');
const profilePopup = document.querySelector('.popup');

const profileEditButton = profile.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.querySelector('.popup__close-button');

const profileForm = profilePopup.querySelector('.popup__form');
const nameField = profilePopup.querySelector('.popup__input_type_name');
const descirptionField = profilePopup.querySelector('.popup__input_type_description');

const cardTemplate = document.querySelector('#card').content;
const elementsList = document.querySelector('.elements__list');

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

// Cards functionality
initialCards.forEach(card => addNewCard(card));

function addNewCard(card) {
  const newCard = cardTemplate.querySelector('.elements__item').cloneNode(true);
  newCard.querySelector('.elements__image').src = card.link;
  newCard.querySelector('.elements__title').textContent = card.name;
  elementsList.prepend(newCard);
}



// Get profile info

let profileInfo = {
  "name": profile.querySelector('.profile__name'),
  "description": profile.querySelector('.profile__description')
};

// Popup handlers for profile editing

function openProfile(){
  nameField.value = profileInfo.name.textContent;
  descirptionField.value = profileInfo.description.textContent;

  profilePopup.classList.add('popup_opened');
}

function closeProfile() {
  profilePopup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openProfile);
profileCloseButton.addEventListener('click', closeProfile);

/*
**  Close popup when clicking outside the popup

function closePopupHandler(event) {
  if (event.target.classList.contains('popup')) {
    closeProfile();
  }
}

profilePopup.addEventListener('mouseup', closePopupHandler);

*/

// Submit new profile info
function submitProfileForm(event) {
  event.preventDefault();

  profileInfo.name.textContent = nameField.value;
  profileInfo.description.textContent = descirptionField.value;

  closeProfile();
}

profileForm.addEventListener('submit', submitProfileForm);






