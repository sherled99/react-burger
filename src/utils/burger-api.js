const _url = 'https://norma.nomoreparties.space/api';

export const getAllIngridients = () => {
    return fetch(`${_url}/ingredients`)
        .then(_checkReponse)    
        .catch((err) => console.log(err));
}

const _checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };