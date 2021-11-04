const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  errorMessageClass: 'popup__input-error_active',
  errorInputClass: 'popup__input_type_error',
  submitButtonDisabledClass: 'popup__submit-button_inactive'
};

// Reset forms
function resetForm(form, config) {
  form.reset();

  const inputs = [...form.querySelectorAll(config.inputSelector)];

  resetInputsErrors(inputs, form, config);

  setSubmitButtonState(form, config);
}

function resetInputsErrors(inputs, form, config) {
  inputs.forEach(input => {
    hideInputError(input, form, config);
  })
}

// Validate forms
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


validateForms(validationConfig);
