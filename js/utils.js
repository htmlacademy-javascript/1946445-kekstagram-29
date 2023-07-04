import {COMMENTS_ARRAY, NAMES, PHOTO_DESCRIPTION, MAX_COMMENT_COUNT, LIKE_MIN_COUNT, LIKE_MAX_COUNT, AVATAR_MAX_COUNT, IMAGES_QUANTITY} from './data.js';

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createMessage = () => Array.from(
  {length: getRandomPositiveInteger(1, 2)},
  () => getRandomArrayElement (COMMENTS_ARRAY),
).join(' ');

const createIdGenerator = () => {
  let previousId = 0;

  return () => {
    previousId += 1;
    return previousId;
  };
};

const createId = createIdGenerator();

const createComments = () => ({
  id: createId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, AVATAR_MAX_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createDescription = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTION),
  likes: getRandomPositiveInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from(
    {length: getRandomPositiveInteger(0, MAX_COMMENT_COUNT)},
    createComments,
  ),
});

const getPictures = () => Array.from(
  {length: IMAGES_QUANTITY},
  (_, pictureIndex) => createDescription(pictureIndex + 1),
);

const newImages = getPictures();

export {newImages, isEscapeKey};

