import {getPictures} from './utils.js';

const userDialog = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const newImages = getPictures();
const userFragment = document.createDocumentFragment();

newImages.forEach(({url, description, likes, comments}) => {
  const addElement = pictureTemplate.cloneNode(true);
  addElement.querySelector('.picture__img').src = url;
  addElement.querySelector('.picture__img').alt = description;
  addElement.querySelector('.picture__likes').textContent = likes;
  addElement.querySelector('.picture__comments').textContent = comments.length;
  userFragment.append(addElement);
});

userDialog.append(userFragment);

