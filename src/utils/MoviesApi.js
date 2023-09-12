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

  getMovies() {
    return fetch(`${this.url}/beatfilm-movies`, {
      headers: this.headers,
    }).then(this._getResponse);
  }
}
const MoviesApi = new Api({
  baseUrl: "https://api.nomoreparties.co",
});
export default MoviesApi;