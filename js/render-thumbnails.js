import { newImages } from './utils.js';

const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imagesContainer = document.querySelector('.pictures');
const imageFragment = document.createDocumentFragment();

newImages.forEach(({url, description, likes, comments, id}) => {
  const newImage = imageTemplate.cloneNode(true);
  const imageThumbnail = newImage.querySelector('.picture__img');
  imageThumbnail.src = url;
  imageThumbnail.alt = description;
  imageThumbnail.dataset.imageId = id;
  newImage.querySelector('.picture__likes').textContent = likes;
  newImage.querySelector('.picture__comments').textContent = comments.length;
  imageFragment.append(newImage);
});

imagesContainer.append(imageFragment);

export { imagesContainer};
