import { openModal, renderBigImageData } from './render-fullsized.js';

const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imagesContainer = document.querySelector('.pictures');
const imageFragment = document.createDocumentFragment();

const createThumbnails = (data) => {
  data.forEach((picture) => {
    const newImage = imageTemplate.cloneNode(true);
    const imageThumbnail = newImage.querySelector('.picture__img');
    imageThumbnail.src = picture.url;
    imageThumbnail.alt = picture.description;
    imageThumbnail.dataset.imageId = picture.id;
    newImage.querySelector('.picture__likes').textContent = picture.likes;
    newImage.querySelector('.picture__comments').textContent = picture.comments.length;
    newImage.addEventListener('click', (evt) => {
      openModal(newImage);
      evt.preventDefault();
      renderBigImageData(picture);
    });
    imageFragment.append(newImage);
  });
  imagesContainer.append(imageFragment);
};

export {createThumbnails, imagesContainer};
