import { defineStore } from 'pinia';

import getFilms from '@/API/modules/films';
import mapTopFilms from '@/mapping/MapTopFetch';
import mapGenresAndCountriesFilms from '@/mapping/MapGenresAndCountriesFilms';

export const useMoviesCatalog = defineStore('movies_catalog', {
  state: () => ({
    // TODO переименовать countriesSelected переименовать.
    // Фильмы по странам
    isLoading: false,
    searchResults: [],
    genresSelected: [],
    countriesSelected: [],
    topMoviesSelected: [],
    paramObject: {
      genres: '',
      countries: '',
      order: 'RATING',
      type: 'ALL',
      ratingFrom: 0,
      ratingTo: 10,
      page: 1,
    },
  }),
  actions: {
    setLoading(loadingState) {
      this.isLoading = loadingState;
    },
    resetState() {
      this.isLoading = false;
      this.searchResults = [];
      this.genresSelected = [];
      this.countriesSelected = [];
      this.paramObject = {};
      this.topMoviesSelected = [];
    },
    async fetchSearch(searchByKeyword) {
      this.isLoading = true;

      try {
        const resp = await getFilms('v2.1', { keyword: searchByKeyword, page: 1 }, '/search-by-keyword');

        this.searchResults = mapTopFilms(resp.data.films);
      } catch (error) {
        console.log('fetchSearch error: ', error);
      }

      this.isLoading = false;
    },
    async fetchGenres(genreId) {
      this.isLoading = true;

      // Установим значение жанра для запроса
      this.paramObject.genres = ''; // TODO зачем задаем заново пустую строку?
      this.paramObject.country = '';
      this.paramObject.genres = genreId;

      try {
        const resp = await getFilms('v2.2', this.paramObject, '');

        this.genresSelected = mapGenresAndCountriesFilms(resp.data.items);
      } catch (error) {
        console.log('FetchGenres error', error);
      }

      this.isLoading = false;
    },
    async fetchCountries(countryId) {
      this.isLoading = true;

      // Установим id страны по которой будем осуществлять поиск
      this.paramObject.genres = '';
      this.paramObject.country = '';
      this.paramObject.countries = countryId;

      try {
        const resp = await getFilms('v2.2', this.paramObject, '');

        this.countriesSelected = mapGenresAndCountriesFilms(resp.data.items);
      } catch (error) {
        console.log('FetchCountries error', error);
      }

      this.isLoading = false;
    },
    async fetchTopSpecific(requestedParam) {
      this.isLoading = true;

      try {
        const resp = await getFilms('v2.2', requestedParam, '/top');

        this.topMoviesSelected = mapTopFilms(resp.data.films);
      } catch (error) {
        console.log('FetchTopSpecific error', error);
      }

      this.isLoading = false;
    },
  },
});
