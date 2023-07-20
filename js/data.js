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

const IMAGES_QUANTITY = 25;

const COMMENTS_QUANTITY = 5;

const MAX_HASHTAG_QUANTITY = 5;

const VALID_SYMBOLS = /^#[a-zа-яë0-9]{1,19}$/i;

const DEFAULT_SCALE = 100;

const SCALE_STEP = 25;

const MIN_SCALE = 25;

const MAX_SCALE = 100;

const ALERT_SHOW_TIME = 5000;

export {COMMENTS_ARRAY, NAMES, PHOTO_DESCRIPTION, MAX_COMMENT_COUNT,
  LIKE_MIN_COUNT, LIKE_MAX_COUNT, AVATAR_MAX_COUNT, IMAGES_QUANTITY,
  COMMENTS_QUANTITY, MAX_HASHTAG_QUANTITY, VALID_SYMBOLS, DEFAULT_SCALE,
  SCALE_STEP, MIN_SCALE, MAX_SCALE, ALERT_SHOW_TIME};
