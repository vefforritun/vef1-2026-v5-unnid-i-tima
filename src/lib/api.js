import { sleep, error } from './helpers.js';

/** Hámarksfjöldi hráefna í svari frá API. */
const MAX_INGREDIENTS = 20;

/* TODO útfæra rest */
export class MealApi {
  /**
   * @param {string} baseUrl API base url.
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async search(query) {
    /* TODO útfæra */
  }
}

// TODO dæmi úr fyrirlestri — henda þegar búið að setja í class

// Leitarslóð fyrir "soup" er:
// https://www.themealdb.com/api/json/v1/1/search.php?s=soup
// Slóð fyrir staka uppskrift er t.d.
// https://www.themealdb.com/api/json/v1/1/lookup.php?i=53308

export const searchUrl =
  'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const itemUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=53308';

/* Dæmi sem notar async await */

/**
 *
 * @param {string} url
 * @returns
 */
export async function myFetch(url) {
  const response = await fetch(url);

  const json = await response.json();
  return json;
}

const searchJson = await myFetch(searchUrl);
const itemJson = await myFetch(itemUrl);

console.log('First item', searchJson.meals[0].strMeal);
console.log('itemJson', itemJson.meals[0].strMeal);

/* Dæmi sem notar promises og callbacks
const response = fetch(url);

console.log('#1', 'response is', response);

response.then((response) => {
  console.log(new Date().toISOString(), '#2', 'Fulfilled!', response);

  response.json().then((json) => {
    console.log(new Date().toISOString(), '#3', 'json', json);

    console.log('First item', json.meals[0].strMeal);
  });
});

console.log(new Date().toISOString(), '#4', 'log eftir response then');
*/
