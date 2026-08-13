import { newsList } from './components/news/newsData.js';

export const staticRoutes = [
  '/',
  '/onas',
  '/cennik',
  '/dlaczego',
  '/aktualnosci',
  ...newsList.map(({ id }) => `/aktualnosci/${id}`),
];

export const notFoundBuildPath = '/__404__';
