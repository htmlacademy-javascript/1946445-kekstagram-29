import { RANDOM_IMAGES_QUANTITY } from './data.js';

const FILTER_TYPES = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const imagesFilter = document.querySelector('.img-filters');
let currentFilter = FILTER_TYPES.DEFAULT;
let images = [];

const clearImages = () => document.querySelectorAll('.picture').forEach((picture) => picture.remove());

const filterRandom = () => Math.random() - 0.5;

const filterPopular = (imageA, imageB) => imageB.comments.length - imageA.comments.length;

const sortImages = () => {
  switch(currentFilter) {
    case FILTER_TYPES.RANDOM:
      return [...images].sort(filterRandom).slice(0, RANDOM_IMAGES_QUANTITY);
    case FILTER_TYPES.DISCUSSED:
      return [...images].sort(filterPopular);
    default:
      return [...images];
  }
};

const onFilterButtonClick = (cb) => {
  imagesFilter.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && evt.target.id !== currentFilter) {
      const buttonToClick = evt.target;
      const activeButton = imagesFilter.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      buttonToClick.classList.add('img-filters__button--active');
      currentFilter = buttonToClick.id;
      clearImages();
      cb(sortImages());
    }
  });
};

const showFilteredImages = (imagesData, callback) =>{
  imagesFilter.classList.remove('img-filters--inactive');
  images = [...imagesData];
  onFilterButtonClick(callback);
};

export { showFilteredImages };
