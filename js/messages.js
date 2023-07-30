import { isEscapeKey } from './utils.js';
import { onDocumentKeydown } from './form.js';

const successMessage = document.querySelector('#success').content.cloneNode(true);
const errorMessage = document.querySelector('#error').content.cloneNode(true);
const successModal = successMessage.querySelector('.success');
const errorModal = errorMessage.querySelector('.error');
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

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
  successModal.remove();
  document.removeEventListener('keydown', onSuccessModalEscKeydown);
}

function closeErrorModal() {
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
  document.body.append(successModal);
  successButton.addEventListener('click', onSuccessButtonClick);
  successModal.addEventListener('click', onSuccessOuterClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onSuccessModalEscKeydown);
};

const showErrorMessage = () => {
  document.body.append(errorModal);
  errorButton.addEventListener('click', onErrorButtonClick);
  errorModal.addEventListener('click', onErrorOuterClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onErrorModalEscKeydown);
};

export { showSuccessMessage, showErrorMessage };
