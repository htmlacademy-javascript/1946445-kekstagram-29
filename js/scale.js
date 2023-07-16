import { DEFAULT_SCALE, SCALE_STEP, MIN_SCALE, MAX_SCALE } from './data.js';

const imageReducingButton = document.querySelector('.scale__control--smaller');
const imageEnlargingButton = document.querySelector('.scale__control--bigger');
const imageScaleInput = document.querySelector('.scale__control--value');
const imageUploaded = document.querySelector('.img-upload__preview img');
let currentValue = parseInt(imageScaleInput.value, 10);

const scaleImage = (value) => {
  imageUploaded.style.transform = `scale(${value / 100})`;
  imageScaleInput.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  if (currentValue > MIN_SCALE) {
    currentValue -= SCALE_STEP;
  }
  scaleImage(currentValue);
};

const onBiggerButtonClick = () => {
  if (currentValue < MAX_SCALE) {
    currentValue += SCALE_STEP;
  }
  scaleImage(currentValue);
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

imageReducingButton.addEventListener('click', onSmallerButtonClick);
imageEnlargingButton.addEventListener('click', onBiggerButtonClick);

export {resetScale};
