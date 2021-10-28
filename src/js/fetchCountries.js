const URLlink = 'https://restcountries.com/v2/name/';

export default class {
  constructor() {}
  fetchProm(name) {
    return fetch(URLlink + name)
      .then(res => res.json())
      .catch(alert);
  }
}