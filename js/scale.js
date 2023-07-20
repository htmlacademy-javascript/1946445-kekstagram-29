import { DEFAULT_SCALE, SCALE_STEP, MIN_SCALE, MAX_SCALE } from './data.js';

const imageScaleInput = document.querySelector('.scale__control--value');
const imageUploaded = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageUploaded.style.transform = `scale(${value / 100})`;
  imageScaleInput.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(imageScaleInput.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(imageScaleInput.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

export {resetScale, onSmallerButtonClick, onBiggerButtonClick, imageUploaded};
