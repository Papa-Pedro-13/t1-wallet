import toast from 'react-hot-toast';

export function handlingRequestError(error) {
  if (error.response) {
    // Запрос был сделан, и сервер ответил кодом состояния, который
    // выходит за пределы 2xx
    toast.error('Произошла ошибка!');
  } else if (error.request) {
    // Запрос был сделан, но ответ не получен
    // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
    // http.ClientRequest в node.js
    console.log(error.request);
    toast.error('Сервер не отвечает. Попробуйте позже');
  } else {
    // Произошло что-то при настройке запроса, вызвавшее ошибку
    console.log('Error', error.message);
    toast.error('Что-то не так. Попробуйте позже');
  }
  console.log(error);
}
