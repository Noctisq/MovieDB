import { API_ENDPOINT_FIND_ONE, API_ENDPOINT_POPULAR, API_ENDPOINT_TRENDINGMOVIES, API_ENDPOINT_BESTRATED, API_ENDPOINT_SEARCH } from "../utils/url"


test('getting popular movies correctly', async () => {
  const data = await fetch(API_ENDPOINT_POPULAR);
  const parsedData = await data.json();

  expect(true).toBe(parsedData.results[0].hasOwnProperty('title'));
});

test('getting trending movies correctly', async () => {
  const data = await fetch(API_ENDPOINT_TRENDINGMOVIES);
  const parsedData = await data.json();

  expect(true).toBe(parsedData.results[0].hasOwnProperty('title'));
});

test('getting best rated movies correctly', async () => {
  const data = await fetch(API_ENDPOINT_BESTRATED);
  const parsedData = await data.json();

  expect(true).toBe(parsedData.results[0].hasOwnProperty('title'));
});

test('getting a movie by id correctly', async () => {
  const data = await fetch(`${API_ENDPOINT_FIND_ONE}${9398}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`);
  const parsedData = await data.json();

  expect(true).toBe(parsedData.hasOwnProperty('title'));
});

