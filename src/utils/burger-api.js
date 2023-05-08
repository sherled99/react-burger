const _url = 'https://norma.nomoreparties.space/api';

export const getAllIngridients = () => {
    return _request(`${_url}/ingredients`);
}

export const createOrder = (ingredients) => {
    return _request(`${_url}/orders`, {
        method: "POST",
        body: JSON.stringify({ingredients:ingredients}),
        headers: {
            "Content-Type": "application/json"
        }
    });
}

const _request = (url, options) => {
    return fetch(url, options).then(_checkReponse).then(res => _checkSuccess(res));
  }

const _checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

const _checkSuccess = (res) => {
    return res && res.success ? res : Promise.reject(`Ошибка: ${res}`);
};