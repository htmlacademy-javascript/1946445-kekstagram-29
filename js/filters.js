import { RANDOM__IMAGES__QUANTITY } from './data.js';

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const imagesFilter = document.querySelector('.img-filters');
let currentFilter = FilterType.DEFAULT;
let images = [];

const clearImages = () => document.querySelectorAll('.picture').forEach((picture) => picture.remove());

const filterRandom = () => Math.random() - 0.5;

const filterPopular = (imageA, imageB) => imageB.comments.length - imageA.comments.length;

const sortImages = () => {
  switch(currentFilter) {
    case FilterType.RANDOM:
      return [...images].sort(filterRandom).slice(0, RANDOM__IMAGES__QUANTITY);
    case FilterType.DISCUSSED:
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

document.removeEventListener('keydown', onFilterButtonClick);

const showFilteredImages = (imagesData, callback) =>{
  imagesFilter.classList.remove('img-filters--inactive');
  images = [...imagesData];
  onFilterButtonClick(callback);
};

export { showFilteredImages };
