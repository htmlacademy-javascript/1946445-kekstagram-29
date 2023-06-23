const COMMENTS_ARRAY = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Альберт',
  'Альфред',
  'Артур',
  'Гарри',
  'Джейкоб',
  'Джон',
  'Майкл',
  'Найджел',
  'Роберт',
  'Стивен'
];

const PHOTO_DESCRIPTION = [
  'Идеальный день',
  'Время перемен',
  'Путешествие – всегда лучшая часть',
  'Счастье на пляже',
  'Отпуск не ждет'
];

const MAX_COMMENT_COUNT = 30;

const LIKE_MIN_COUNT = 15;

const LIKE_MAX_COUNT = 200;

const AVATAR_MAX_COUNT = 6;

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
  {length: 25},
  (_, pictureIndex) => createDescription(pictureIndex + 1),
);

getPictures();
