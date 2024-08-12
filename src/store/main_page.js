import { defineStore } from 'pinia';

import getFilms from '@/API/modules/films';
import getRandomNums from '@/utils/RandomNums';

export const useMainPage = defineStore('main_page', {
  state: () => ({
    moviesTop250: [],
    moviesTop100: [],
    moviesTopAwait: [],
    moviesTop250Random: [],
    premiers: [],
    genres: [
      {
        id: 0,
        label: null,
      },
    ],
    countries: [
      {
        id: 0,
        label: null,
      },
    ],
    isModalOpened: false,
  }),
  getters: {
    getGenreSelectedName: state => id => state.genres.find(film => film.id === id)?.label,
    getCountriesSelectedName: state => id => state.countries?.find(film => film.id === id)?.label,
    getModalState: state => state.isModalOpened,
  },
  actions: {
    setTop250Random(movies) {
      const listLimit = 3;
      const randomNumbers = getRandomNums(0, movies.length - 1, listLimit);

      for (let number in randomNumbers) {
        this.moviesTop250Random.push(movies[randomNumbers[number]]);
      }
    },
    setGenres(movies) {
      this.genres = movies.map(movie => ({
        id: movie.id,
        label: movie.genre,
      }));
    },
    setCountries(movies) {
      this.countries = movies.map(movie => ({
        id: movie.id,
        label: movie.country,
      }));
    },
    resetState() {
      this.moviesTop250 = [];
      this.moviesTop100 = [];
      this.moviesTopAwait = [];
      this.moviesTop250Random = [];
      this.premiers = [];
      this.genres = [];
      this.countries = [];
    },
    async fetchTop() {
      try {
        const resp250 = await getFilms('v2.2', { type: 'TOP_250_BEST_FILMS', page: 1 }, '/top');
        this.moviesTop250 = resp250.data.films;
        this.setTop250Random(resp250.data.films);

        const resp100 = await getFilms('v2.2', { type: 'TOP_100_POPULAR_FILMS', page: 1 }, '/top');
        this.moviesTop100 = resp100.data.films;

        const respAwait = await getFilms('v2.2', { type: 'TOP_AWAIT_FILMS', page: 1 }, '/top');
        this.moviesTopAwait = respAwait.data.films;
      } catch (error) {
        console.log('FetchTop error: ', error);
      }
    },
    async fetchPremiers(currentMonth) {
      try {
        const resp = await getFilms('v2.2', { year: new Date().getFullYear(), month: currentMonth }, '/premieres');

        this.premiers = resp.data.items;
      } catch (error) {
        console.log('FetchPremiers error: ', error);
      }
    },
    async fetchFilters() {
      try {
        const resp = await getFilms('v2.2', null, '/filters');
        this.setGenres(resp.data.genres);

        this.setCountries(resp.data.countries);
      } catch (error) {
        console.log('FetchFilters error: ', error);
      }
    },
    toggleModal() {
      this.isModalOpened = !this.isModalOpened;
    },
    hideModal() {
      this.isModalOpened = false;
    },
  },
});
