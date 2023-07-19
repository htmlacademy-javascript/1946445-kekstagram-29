import { isEscapeKey } from './utils.js';
import { resetScale } from './scale.js';
import { MAX_HASHTAG_QUANTITY, VALID_SYMBOLS } from './data.js';
import { resetEffects } from './slider-effects.js';
import { body } from './render-fullsized.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const fileField = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const openUploadModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadModal = () => {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
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
  'Не больше 5 хештегов',
  3,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  'Хештеги не должны повторяться',
  1,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  'Хештег должен начинаться с #, содержать буквы или цифры, быть не длиннее 20 символов',
  2,
  true
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonKeydown);
form.addEventListener('submit', onFormSubmit);
