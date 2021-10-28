import refs from './refs.js';
import FetchCountries from './fetchCountries';
import countriesMarkup from '../templates/countriesMarkup.hbs';
import countryMarkup from '../templates/countryMarkup.hbs';
import { notice, info } from '../../node_modules/@pnotify/core/';
import '../../node_modules/@pnotify/core/dist/PNotify.css';
import '../../node_modules/@pnotify/core/dist/BrightTheme.css';
const notifyText = {
  title: 'Too many matches found.',
  text: 'Please enter a more specific query.',
};
const infoText = {
  title: 'Nothing found.',
  text: 'Please check your input and try again.',
};
const debounce = require('lodash.debounce');
const { input, results } = refs;
const fetchCountries = new FetchCountries();
input.addEventListener('input', debounce(onInput, 500));
function onInput(e) {
  e.preventDefault();
  if (!e.target.value.trim()) {
    clear();
    return;
  }
  fetchCountries.fetchProm(e.target.value).then(res).catch(alert);
}
function res(countries) {
  if (countries.length > 10) {
    notice(notifyText);
    clear();
  } else if (countries.length > 1) {
    result(countriesMarkup({ countries }));
  } else if (countries.length === 1) {
    result(countryMarkup(...countries));
  } else {
    info(infoText);
    clear();
  }
}
function result(markup) {
  results.innerHTML = markup;
}
function clear() {
  results.innerHTML = '';
}