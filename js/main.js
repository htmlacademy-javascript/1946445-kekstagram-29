import {showAlert} from './utils.js';
import {createThumbnails} from './render-thumbnails.js';
import './render-fullsized.js';
import { onFormSubmit, closeUploadModal} from './form.js';
import './scale.js';
import './slider-effects.js';
import {getData, sendData} from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

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
  createThumbnails(data);
} catch (err) {
  showAlert(err.message);
}
