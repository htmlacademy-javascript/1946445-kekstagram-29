const DATA_SERVER = 'https://29.javascript.pages.academy/kekstagram/data';
const SENDING_SERVER = 'https://29.javascript.pages.academy/kekstagram';

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(route, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(DATA_SERVER, ErrorText.GET_DATA);

const sendData = (body) => load(SENDING_SERVER, ErrorText.SEND_DATA, Method.POST, body);

export {getData, sendData};
