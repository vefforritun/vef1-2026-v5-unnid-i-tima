import { MealApi, myFetch, searchUrl } from './lib/api.js';
import { el, empty } from './lib/elements.js';
import { MealSearcher } from './lib/meals.js';

/** Grunnslóð á API, `1` er ókeypis prófunarlykill. */
const API_BASE = 'https://www.themealdb.com/api/json/v1/1/';

const mealSearcherDiv = document.querySelector('.meal-searcher');

/**
 *
 * @param {any} searchResult
 * @param {Element} mealSearcherDiv
 */
function renderSearchResults(searchResult, mealSearcherDiv) {
  console.log('search results', searchResult, mealSearcherDiv);

  const meals = searchResult.meals;

  const searchResultsEl = document.createElement('ul');
  searchResultsEl.classList.add('results-list');

  for (const meal of meals) {
    console.log('meal', meal);
    const li = document.createElement('li');
    li.textContent = meal.strMeal;
    const img = document.createElement('img');
    img.setAttribute('src', meal.strMealThumb);
    li.appendChild(img);
    searchResultsEl.appendChild(li);
  }

  mealSearcherDiv.appendChild(searchResultsEl);
}

/**
 *
 * @param {SubmitEvent} e
 */
async function onSubmit(e) {
  e.preventDefault();
  console.log('e', e);

  if (!e.target) {
    return;
  }

  const formData = new FormData(e.target);
  const input = formData.get('input');
  const value = typeof input === 'string' ? input : null;

  if (value) {
    const url = searchUrl + value;
    console.log('searchUrl', url);
    const results = await myFetch(url);

    // bleh þetta er skrítið
    if (!mealSearcherDiv) {
      return;
    }
    renderSearchResults(results, mealSearcherDiv);
  } else {
    console.log('value is null', input, e.target);
  }
}

/**
 *
 * @param {Element} root
 */
function createSearchForm(root) {
  const form = el(
    'form',
    { submit: onSubmit },
    el('input', { type: 'text', name: 'input' }),
    el('button', { type: 'submit' }, 'Leita'),
  );
  root.appendChild(form);
}

if (!mealSearcherDiv) {
  console.error('cannot find meal searcher div');
} else {
  createSearchForm(mealSearcherDiv);
}

/** API virkni. */
const api = new MealApi(API_BASE);

/* TODO útfæra rest */
