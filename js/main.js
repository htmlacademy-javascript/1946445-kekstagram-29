import {debounce, showAlert} from './utils.js';
import {createThumbnails} from './render-thumbnails.js';
import './render-fullsized.js';
import { onFormSubmit, closeUploadModal} from './form.js';
import './scale.js';
import './slider-effects.js';
import {getData, sendData} from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import './filters.js';
import { showFilteredImages } from './filters.js';
import {TIMEOUT__DELAY} from './data.js';
import './image-preview.js';

onFormSubmit(async(data) => {
  try {
    await sendData(data);
    closeUploadModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debounceCreateThumbnails = debounce(createThumbnails, TIMEOUT__DELAY);
  createThumbnails(data);
  showFilteredImages(data, debounceCreateThumbnails);
} catch (err) {
  showAlert(err.message);
}
