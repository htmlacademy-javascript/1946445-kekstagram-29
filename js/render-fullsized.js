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

const onCloseButtonKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigImage.classList.add('hidden');
  }
  body.classList.remove('modal-open');
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
};

const renderUserInfo = (imageData) => {
  const userInfo = bigImageCommentsContainer.cloneNode(true);
  const userAvatar = userInfo.querySelector('.social__picture');
  userAvatar.src = imageData.avatar;
  userAvatar.alt = imageData.name;
  userInfo.querySelector('.social__text').textContent = imageData.message;
  return userInfo;
};

const renderComments = (comments) => {
  let commentsVisible = 0;
  return ()=> {
    commentsVisible += COMMENTS_QUANTITY;
    if(commentsVisible >= comments.length){
      bigImageCommentsLoader.classList.add('hidden');
      commentsVisible = comments.length;
    } else {
      bigImageCommentsLoader.classList.remove('hidden');
    }
    const listFragment = document.createDocumentFragment();
    for(let i = 0; i < commentsVisible;i++){
      const comment = renderUserInfo(comments[i]);
      listFragment.appendChild(comment);
    }
    bigImageCommentsTemplate.innerHTML = '';
    bigImageCommentsCount.textContent = commentsVisible;
    bigImageCommentsCount.innerHTML = `${commentsVisible} из <span class="comments-count"> ${comments.length}</span> комментариев`;
    bigImageCommentsTemplate.appendChild(listFragment);
  };
};

const renderBigImageData = (item) => {
  bigPicture.src = item.url;
  bigPicture.alt = item.description;
  bigImage.querySelector('.likes-count').textContent = item.likes;
  bigImage.querySelector('.social__caption').textContent = item.description;
  bigImage.querySelector('.comments-count').textContent = item.comments.length;
  const onCommentsLoaderClick = renderComments(item.comments);
  bigImageCommentsTemplate.comments = onCommentsLoaderClick(item.comments);
  bigImageCommentsLoader.addEventListener('click',onCommentsLoaderClick);
};

bigImageCloseButton.addEventListener ('click', closeModal);

export {openModal,renderBigImageData};
