import { imageUploaded } from './scale.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.img-upload__input[type=file]');
const effectPreview = document.querySelectorAll('.effects__preview');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    imageUploaded.src = URL.createObjectURL(file);
    effectPreview.forEach((effect) => {
      effect.style.backgroundImage = `url(${imageUploaded.src})`;
    });
  }
});
