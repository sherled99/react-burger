import { setCookie, getCookie } from "./cookie";
import { IOptions, ICustomResponse } from "../services/types/data";

const _url = "https://norma.nomoreparties.space/api";

export const getAllIngridients = () => {
  return _request(`${_url}/ingredients`);
};

export const createOrder = (ingredients: Array<string>) => {
  const accessToken = getCookie("accessToken");
  return _fetchWithRefresh(`${_url}/orders`, {
    method: "POST",
    body: JSON.stringify({ ingredients }),
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  });
};

export const resetPassword = (email: string) => {
  return _request(`${_url}/password-reset`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const reset = (password: string, token: string) => {
  return _request(`${_url}/password-reset/reset`, {
    method: "POST",
    body: JSON.stringify({ password, token }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const register = (email: string, password: string, name: string) => {
  return _request(`${_url}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.refreshToken) {
      return res;
    } else {
      setCookie("token", res.refreshToken);
      setCookie("accessToken", res.accessToken);
    }
    return res;
  });
};

export const login = (email: string, password: string) => {
  return _request(`${_url}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.refreshToken) {
      return res;
    } else {
      setCookie("token", res.refreshToken);
      setCookie("accessToken", res.accessToken);
    }
    return res;
  });
};

export const updateUser = (name: string, email: string, password?: string) => {
  const accessToken = getCookie("accessToken");
  return _fetchWithRefresh(`${_url}/auth/user`, {
    method: "PATCH",
    body: password
      ? JSON.stringify({ name, email, password })
      : JSON.stringify({ name, email }),
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  });
};

export const refreshToken = () => {
  const token = getCookie("token");
  return _request(`${_url}/auth/token`, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.refreshToken) {
      return res;
    } else {
      setCookie("token", res.refreshToken);
      setCookie("accessToken", res.accessToken);
    }
    return res;
  });
};

export const logout = () => {
  const token = getCookie("token");
  return _request(`${_url}/auth/logout`, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserRequest = () => {
  const accessToken = getCookie("accessToken");
  return _fetchWithRefresh(`${_url}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  });
};

const _fetchWithRefresh = async (url: string, options: IOptions) => {
  return fetch(url, options)
    .then((res) => _checkResponse(res))
    .catch((err) => {
      if (err.message === "jwt expired") {
        return refreshToken().then(() => {
          options.headers.Authorization = getCookie("accessToken");
          return fetch(url, options).then((res) => _checkResponse(res));
        });
      } else {
        return Promise.reject(err);
      }
    });
};

const _request = (url: string, options?: IOptions) => {
  return fetch(url, options)
    .then((res) => _checkResponse(res))
    .then((res) => _checkSuccess(res))
    .catch((res) => {
      if (!res.success && res.message === "You should be authorised") {
        refreshToken();
      } else {
        return res;
      }
    });
};

const _checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const _checkSuccess = (res: ICustomResponse) => {
  if (res.success === false) {
    throw new Error(`Ошибка: ${res.message}`);
  }
  return res;
};