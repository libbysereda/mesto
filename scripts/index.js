/*** POPUPS ***/
const popupTemplate = document.querySelector('#popup-form').content;
const body = document.querySelector('.body');

// render popups
const popupParams = [
  {
    'title': 'Редактировать профиль',
    'classList': ['popup_type_edit-profile'],
    'form': {
      'classList': ['popup__form_type_edit-profile'],
      'inputFields': [
        {
          'classList': ['popup__input', 'popup__input_type_profile-name'],
          'name': 'profileName',
          'required': true,
          'placeholder': 'Имя',
          'type': 'text'
        },
        {
          'classList': ['popup__input', 'popup__input_type_profile-description'],
          'name': 'profileDescription',
          'required': false,
          'placeholder': 'О себе',
          'type': 'text'
        }
      ]
    }
  },
  {
    'title': 'Новое место',
    'classList': ['popup_type_add-new-element'],
    'form': {
      'classList': ['popup__form_type_add-new-element'],
      'inputFields': [
        {
          'classList': ['popup__input', 'popup__input_type_element-name'],
          'name': 'elementName',
          'required': true,
          'placeholder': 'Название',
          'type': 'text'
        },
        {
          'classList': ['popup__input', 'popup__input_type_element-link'],
          'name': 'elementLink',
          'required': true,
          'placeholder': 'Ссылка на картинку',
          'type': 'url'
        }
      ]
    }
  }
];

popupParams.forEach(item => {
  const newPopup = popupTemplate.querySelector('.popup').cloneNode(true);
  newPopup.classList.add(...item.classList);
  newPopup.querySelector('.popup__title').textContent = item.title;

  const popupCloseButton = newPopup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', closePopup);

  item.form.inputFields.forEach(input => {
    const newInput = document.createElement('input');
    newInput.classList.add(...input.classList);
    newInput.name = input.name;
    newInput.required = input.required;
    newInput.placeholder = input.placeholder;
    newInput.type = input.type;
    newPopup.querySelector('.popup__submit-button').before(newInput);
  });

  body.append(newPopup);

  const popupForm = newPopup.querySelector('.popup__form');
  popupForm.classList.add(...item.form.classList);
  popupForm.addEventListener('submit', submitPopupForm);

});

// Popup handlers
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(evt) {
  const openedPopup = evt.target.parentNode.parentNode;
  openedPopup.classList.remove('popup_opened');
}

function submitPopupForm(evt) {
  evt.preventDefault();

  switch (true) {
    case (evt.target.classList.value.includes('popup__form_type_edit-profile')):
        saveProfileInfo();
        break;
    case (evt.target.classList.value.includes('popup__form_type_add-new-element')):
        addNewCard();
        break;
  }

  closePopup(evt);
}

/*** PROFILE ***/
const profile = document.querySelector('.profile');

let profileInfo = {
  "name": profile.querySelector('.profile__name'),
  "description": profile.querySelector('.profile__description')
};

const profileEditButton = profile.querySelector('.profile__edit-button');

profileEditButton.addEventListener('click', function() {
  const profilePopup = document.querySelector('.popup_type_edit-profile');
  renderProfileInfo();
  openPopup(profilePopup);
});

// Profile handlers
function renderProfileInfo() {
  document.querySelector('.popup__input_type_profile-name').value = profileInfo.name.textContent;
  document.querySelector('.popup__input_type_profile-description').value = profileInfo.description.textContent;
}

function saveProfileInfo() {
  profileInfo.name.textContent = document.querySelector('.popup__input_type_profile-name').value;
  profileInfo.description.textContent = document.querySelector('.popup__input_type_profile-description').value;
}


/*** CARDS ***/

const cardTemplate = document.querySelector('#card').content;
const elementsList = document.querySelector('.elements__list');

const cards = [
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

// render initial cards
cards.forEach(card => renderNewCard(card));

// cards handlers
function addNewCard() {
  const card = {
    'name': document.querySelector('.popup__input_type_element-name').value,
    'link': document.querySelector('.popup__input_type_element-link').value
  };

  cards.push(card);
  renderNewCard(card);

  document.querySelector('.popup__input_type_element-name').value = '';
  document.querySelector('.popup__input_type_element-link').value = '';
}

function renderNewCard(card) {
  const newCard = cardTemplate.querySelector('.elements__item').cloneNode(true);
  newCard.querySelector('.elements__image').src = card.link;
  newCard.querySelector('.elements__title').textContent = card.name;
  elementsList.prepend(newCard);
}

// Add new card button
const profileAddButton = profile.querySelector('.profile__add-button');

profileAddButton.addEventListener('click', function() {
  const addPopup = document.querySelector('.popup_type_add-new-element');
  openPopup(addPopup);
});







