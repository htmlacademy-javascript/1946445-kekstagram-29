import {getPictures} from './utils.js';

const userDialog = document.querySelector('.pictures');
const addTemplate = document.querySelector('#picture').content.querySelector('.picture');
const addNewImages = getPictures();
const userFragment = document.createDocumentFragment();

addNewImages.forEach(({url, description, likes, comments}) => {
  const addElement = addTemplate.cloneNode(true);
  addElement.querySelector('.picture__img').src = url;
  addElement.querySelector('.picture__img').alt = description;
  addElement.querySelector('.picture__likes').textContent = likes;
  addElement.querySelector('.picture__comments').textContent = comments.length;
  userFragment.append(addElement);
});

const finalDialog = userDialog.append(userFragment);

export {finalDialog};
