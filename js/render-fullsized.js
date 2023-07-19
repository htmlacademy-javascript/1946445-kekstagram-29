import { newImages } from './utils.js';
import { imagesContainer } from './render-thumbnails.js';
import { isEscapeKey } from './utils.js';
import { COMMENTS_QUANTITY } from './data.js';

const body = document.querySelector('body');
const bigImage = document.querySelector('.big-picture');
const bigPicture = document.querySelector('.big-picture__img img');
const bigImageCommentsTemplate = document.querySelector('.social__comments');
const bigImageCommentsContainer = document.querySelector('.social__comment');
const bigImageCommentsCount = document.querySelector('.social__comment-count');
const bigImageCommentsLoader = document.querySelector('.comments-loader');
const bigImageCloseButton = document.querySelector('.big-picture__cancel');
const bigImageFragment = document.createDocumentFragment();
const commentsList = [];
let commentsVisible = 0;

const onCloseButtonKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigImage.classList.add('hidden');
    commentsVisible = 0;
    commentsList.length = 0;
  }
  body.classList.remove('modal-open');
};

const renderUserInfo = (imageData) => {
  imageData.forEach(({avatar, name, message}) => {
    const userInfo = bigImageCommentsContainer.cloneNode(true);
    const userAvatar = userInfo.querySelector('.social__picture');
    userAvatar.src = avatar;
    userAvatar.alt = name;
    userInfo.querySelector('.social__text').textContent = message;
    bigImageFragment.append(userInfo);
  });
  bigImageCommentsTemplate.append(bigImageFragment);
};

const renderAllComments = (comments) => {
  for (let i = 0; i < comments.length; i++) {
    commentsList.push(comments[i]);
  }
};

const showMoreComments = () => {
  const commentsMore = commentsList.slice(commentsVisible, commentsVisible + COMMENTS_QUANTITY);
  commentsVisible += commentsMore.length;
  renderUserInfo(commentsMore);
  if (commentsVisible >= commentsList.length) {
    bigImageCommentsLoader.classList.add('hidden');
    commentsVisible = commentsList.length;
  } else {
    bigImageCommentsLoader.classList.remove('hidden');
  }
  bigImageCommentsCount.innerHTML = `${commentsVisible} из <span class="comments-count"> ${commentsList.length}</span> комментариев`;
};

const openModal = () => {
  bigImage.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onCloseButtonKeydown);
};

const closeModal = () => {
  bigImage.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseButtonKeydown);
  document.removeEventListener('click', showMoreComments);
  commentsVisible = 0;
  commentsList.length = 0;
};

const renderBigImageData = ({url, likes, comments, description}) => {
  bigPicture.src = url;
  bigPicture.alt = description;
  bigImage.querySelector('.likes-count').textContent = likes;
  bigImage.querySelector('.social__caption').textContent = description;
  bigImage.querySelector('.comments-count').textContent = comments.length;
  renderAllComments(comments);
};

const showBigImage = (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    const imageId = parseInt(evt.target.dataset.imageId, 10);
    const pictureData = newImages.find((item) => item.id === imageId);
    bigImageCommentsTemplate.textContent = '';
    renderBigImageData(pictureData);
    openModal();
    showMoreComments();
  }
};

bigImageCloseButton.addEventListener ('click', closeModal);
imagesContainer.addEventListener ('click', showBigImage);
bigImageCommentsLoader.addEventListener('click', showMoreComments);

