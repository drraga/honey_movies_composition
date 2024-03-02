import getFilms from '../../API/modules/films';
import getRandomNums from '../../utils/RandomNums';

export default {
  namespaced: true,
  state: {
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
  },
  getters: {
    getMoviesTop250: state => state.moviesTop250,
    getMoviesTop100: state => state.moviesTop100,
    getMoviesTopAwait: state => state.moviesTopAwait,
    getMoviesTop250Random: state => state.moviesTop250Random,
    getPremiers: state => state.premiers,
    getGenres: state => state.genres,
    getCountries: state => state.countries,
    getGenreSelectedName: state => id => state.genres.find(item => item.id === id)?.label ?? '',
    getCountriesSelectedName: state => id => state.countries.find(item => item.id === id)?.label ?? '',
  },
  mutations: {
    SET_TOP_250(state, payload) {
      state.moviesTop250 = payload;
    },
    SET_TOP_100(state, payload) {
      state.moviesTop100 = payload;
    },
    SET_TOP_AWAIT(state, payload) {
      state.moviesTopAwait = payload;
    },
    SET_TOP_250_RANDOM(state, payload) {
      const listLimit = 3;
      const random = getRandomNums(0, payload.length - 1, listLimit);
      for (let i = 0; i < random.length; i += 1) {
        state.moviesTop250Random.push(payload[random[i]]);
      }
    },
    SET_PREMIERS(state, payload) {
      state.premiers = payload;
    },
    SET_GENRES(state, payload) {
      state.genres = payload.map(item => ({
        id: item.id,
        label: item.genre,
      }));
    },
    SET_COUNTRIES(state, payload) {
      state.countries = payload.map(item => ({
        id: item.id,
        label: item.country,
      }));
    },
    RESET_STATE(state) {
      state.moviesTop250 = [];
      state.moviesTop100 = [];
      state.moviesTopAwait = [];
      state.moviesTop250Random = [];
      state.premiers = [];
      state.genres = [];
      state.countries = [];
    },
  },
  actions: {
    async fetchTop({ commit }) {
      try {
        const resp250 = await getFilms('v2.2', { type: 'TOP_250_BEST_FILMS', page: 1 }, '/top');
        commit('SET_TOP_250', resp250.data.films);
        commit('SET_TOP_250_RANDOM', resp250.data.films);

        const resp100 = await getFilms('v2.2', { type: 'TOP_100_POPULAR_FILMS', page: 1 }, '/top');
        commit('SET_TOP_100', resp100.data.films);

        const respAwait = await getFilms('v2.2', { type: 'TOP_AWAIT_FILMS', page: 1 }, '/top');
        commit('SET_TOP_AWAIT', respAwait.data.films);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPremiers({ commit }, currentMonth) {
      try {
        const resp = await getFilms('v2.2', { year: new Date().getFullYear(), month: currentMonth }, '/premieres');
        commit('SET_PREMIERS', resp.data.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchFilters({ commit }) {
      try {
        const resp = await getFilms('v2.2', null, '/filters');
        commit('SET_GENRES', resp.data.genres);

        commit('SET_COUNTRIES', resp.data.countries);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
