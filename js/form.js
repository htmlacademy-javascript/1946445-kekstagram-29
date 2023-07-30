import { isEscapeKey } from './utils.js';
import { resetScale, onBiggerButtonClick, onSmallerButtonClick, imageUploaded } from './scale.js';
import { MAX_HASHTAG_QUANTITY, VALID_SYMBOLS, PERCENTAGE, INITIAL_SCALE } from './data.js';
import { resetEffects } from './slider-effects.js';

const body = document.querySelector('body');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const fileField = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const imageReducingButton = document.querySelector('.scale__control--smaller');
const imageEnlargingButton = document.querySelector('.scale__control--bigger');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const openUploadModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imageReducingButton.addEventListener('click', onSmallerButtonClick);
  imageEnlargingButton.addEventListener('click', onBiggerButtonClick);
};

const closeUploadModal = () => {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imageReducingButton.removeEventListener('click', onSmallerButtonClick);
  imageEnlargingButton.removeEventListener('click', onBiggerButtonClick);
  imageUploaded.style.transform = `scale(${INITIAL_SCALE / PERCENTAGE})`;
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadModal();
  }
}

const onFileInputChange = () => {
  openUploadModal();
};

const onCancelButtonKeydown = () => {
  closeUploadModal();
};

const normalizeTags = (value) => value
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_QUANTITY;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  'Не больше 5 хештегов'
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  'Хештеги не должны повторяться'
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  'Хештег должен начинаться с #, содержать буквы или цифры, быть не длиннее 20 символов'
);

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onFormSubmit = (callback) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      disableSubmitButton();
      await callback(new FormData(form));
      enableSubmitButton();
    }
  });
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonKeydown);

export {onFormSubmit, closeUploadModal, onDocumentKeydown, body};
