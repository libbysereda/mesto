const body = document.querySelector('.body');
const profile = document.querySelector('.profile');
const profilePopup = document.querySelector('.popup');

const profileEditButton = profile.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.querySelector('.popup__close-button');

const profileForm = profilePopup.querySelector('.popup__form');
const nameField = profilePopup.querySelector('.popup__input_type_name');
const descirptionField = profilePopup.querySelector('.popup__input_type_description');

let profileInfo = {
  "name": profile.querySelector('.profile__name'),
  "description": profile.querySelector('.profile__description')
};


function openProfile(){
  nameField.value = profileInfo.name.textContent;
  descirptionField.value = profileInfo.description.textContent;

  body.classList.add('body_no-scroll');
  profilePopup.classList.add('popup_opened');
}


function closeProfile() {
  profilePopup.classList.remove('popup_opened');
  body.classList.remove('body_no-scroll');
}


function closePopupHandler(event) {
  if (event.target.classList.contains('popup')) {
    closeProfile();
  }
}


function submitProfileForm(event) {
  event.preventDefault();

  profileInfo.name.textContent = nameField.value;
  profileInfo.description.textContent = descirptionField.value;

  closeProfile();
}


profileEditButton.addEventListener('click', openProfile);

profileCloseButton.addEventListener('click', closeProfile);
profilePopup.addEventListener('mouseup', closePopupHandler);

profileForm.addEventListener('submit', submitProfileForm);






