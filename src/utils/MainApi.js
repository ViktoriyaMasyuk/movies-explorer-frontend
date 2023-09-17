import { MAIN_URL } from "./constants";

class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    };
  }

  saveMovies(data) {
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      credentials: "include",
      headers: this._getHeaders(),
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      }),
    }).then(this._getResponse);
  }

  deleteMovie(movieId) {
    console.log(`${this.url}/movies/${movieId}`);
    return fetch(`${this.url}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getResponse);
  }
  getSavedMovies() {
    return fetch(`${this.url}/movies`, {
      method: 'GET',
      headers: this._getHeaders(),
    }).then(this._getResponse);
  }
  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._getResponse);
  }
  updateUserInfo(name, email) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._getResponse);
  }
}
const MainApi = new Api({
  baseUrl: MAIN_URL,
});
export default MainApi;