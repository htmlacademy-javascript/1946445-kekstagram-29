import { isEscapeKey } from './utils.js';
import { onDocumentKeydown } from './form.js';

const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;

const onSuccessModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeSuccessModal();
  }
};

const onErrorModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeErrorModal();
  }
};

function closeSuccessModal() {
  const successModal = document.querySelector('.success');
  successModal.remove();
  document.removeEventListener('keydown', onSuccessModalEscKeydown);
}

function closeErrorModal() {
  const errorModal = document.querySelector('.error');
  errorModal.remove();
  document.removeEventListener('keydown', onErrorModalEscKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
}

const onSuccessOuterClick = (evt) => {
  if (!(evt.target.closest('.success__inner'))) {
    closeSuccessModal();
  }
};

const onErrorOuterClick = (evt) => {
  if (!(evt.target.closest('.error__inner'))) {
    closeErrorModal();
  }
};

const onSuccessButtonClick = () => {
  closeSuccessModal();
};

const onErrorButtonClick = () => {
  closeErrorModal();
};

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);
  const successButton = document.querySelector('.success__button');
  const successModal = document.querySelector('.success');
  successButton.addEventListener('click', onSuccessButtonClick);
  successModal.addEventListener('click', onSuccessOuterClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onSuccessModalEscKeydown);
};

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessage);
  const errorButton = document.querySelector('.error__button');
  const errorModal = document.querySelector('.error');
  errorButton.addEventListener('click', onErrorButtonClick);
  errorModal.addEventListener('click', onErrorOuterClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onErrorModalEscKeydown);
};

export { showSuccessMessage, showErrorMessage };
