const ENDPOINTS = {
  GET_DATA: 'https://29.javascript.pages.academy/kekstagram/data',
  SUBMIT_FORM: 'https://29.javascript.pages.academy/kekstagram'
};

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

const getData = () => load(ENDPOINTS.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(ENDPOINTS.SUBMIT_FORM, ErrorText.SEND_DATA, Method.POST, body);

export {getData, sendData};
