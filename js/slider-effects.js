import { imageUploaded } from './scale.js';

const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 0,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];

const DEFAULT_EFFECT = EFFECTS[0];

const effectsList = document.querySelector('.effects__list');
const sliderInput = document.querySelector('.effect-level__value');
const sliderRange = document.querySelector('.img-upload__effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
let currentEffect = DEFAULT_EFFECT;

const isDefaultEffect = () => currentEffect === DEFAULT_EFFECT;

const showSlider = () => {
  sliderRange.classList.remove('hidden');
};

const hideSlider = () => {
  sliderRange.classList.add('hidden');
};

noUiSlider.create(effectSlider, {
  range: {
    min: currentEffect.min,
    max: currentEffect.max
  },
  start: currentEffect.max,
  step: currentEffect.step,
  connect: 'lower'
});

const updateSlider = () => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    start: currentEffect.max,
    step: currentEffect.step
  });
  if (isDefaultEffect()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onEffectChange = (evt) => {
  if(evt.target.classList.contains('effects__radio')) {
    const effectName = evt.target.value;
    imageUploaded.className = `effects__preview--${effectName}`;
    currentEffect = EFFECTS.find((item) => item.name === effectName);
  }
  updateSlider();
};

const onSliderUpdate = () => {
  sliderInput.value = effectSlider.noUiSlider.get();
  if (isDefaultEffect()) {
    imageUploaded.style.filter = DEFAULT_EFFECT.style;
  } else {
    imageUploaded.style.filter = `${currentEffect.style}(${sliderInput.value}${currentEffect.unit})`;
  }
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

hideSlider();

effectsList.addEventListener('change', onEffectChange);
effectSlider.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };

