import getFilms from '../../API/modules/films'
import mapTopFilms from '../../mapping/MapTopFetch'
import mapGenresAndCountriesFilms from '../../mapping/MapGenresAndCountriesFilms'

export default {
  namespaced: true,
  state: {
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
      page: 1
    },
  },
  getters: {
    isLoading: (state) => state.isLoading,
    getSearchResults: (state) => state.searchResults,
    getGenresSelected: (state) => state.genresSelected,
    getCountriesSelected: (state) => state.countriesSelected,
    getTopMoviesSelected: (state) => state.topMoviesSelected,
  },
  mutations: {
    SET_LOADING(state, loadingState) {
      state.isLoading = loadingState
    },
    SET_SEARCH_RESULTS(state, movies) {
      state.searchResults = mapTopFilms(movies)
    },
    SET_GENRES_SELECTED(state, movies) {
      state.genresSelected = mapGenresAndCountriesFilms(movies)
    },
    SET_COUNTRIES_SELECTED(state, movies) {
      state.countriesSelected = mapGenresAndCountriesFilms(movies)
    },
    SET_REQUEST_PARAMS_GENRE(state, genreId) {
      state.paramObject.genres = ''
      state.paramObject.country = ''
      state.paramObject.genres = genreId
    },
    SET_REQUEST_PARAMS_COUNTRY(state, countryId) {
      state.paramObject.genres = ''
      state.paramObject.country = ''
      state.paramObject.countries = countryId
    },
    SET_REQUEST_TOP(state, movies) {
      state.topMoviesSelected = mapTopFilms(movies);
    },
    RESET_STATE(state) {
      state.isLoading = false;
      state.searchResults = [];
      state.genresSelected = [];
      state.countriesSelected = [];
      state.paramObject = {};
      state.topMoviesSelected = [];
    }
  },
  actions: {
    async fetchSearch({ commit }, searchByKeyword) {
      commit('SET_LOADING', true)

      try {
        const resp = await getFilms('v2.1', { keyword: searchByKeyword, page: 1 }, '/search-by-keyword')
        commit('SET_SEARCH_RESULTS', resp.data.films)
      } catch (error) {
        console.log(error)
      }

      commit('SET_LOADING', false)
    },
    async fetchGenres({ commit, state }, genreId) {
      commit('SET_LOADING', true)
      commit('SET_REQUEST_PARAMS_GENRE', genreId)

      try {
        const resp = await getFilms('v2.2', state.paramObject, '');
        commit('SET_GENRES_SELECTED', resp.data.items)
      } catch (error) {
        console.log(error)
      }

      commit('SET_LOADING', false)
    },
    async fetchCountries({ commit, state }, countryId) {
      commit('SET_LOADING', true)
      commit('SET_REQUEST_PARAMS_COUNTRY', countryId)

      try {
        const resp = await getFilms('v2.2', state.paramObject, '');
        commit('SET_COUNTRIES_SELECTED', resp.data.items)
      } catch (error) {
        console.log(error)
      }

      commit('SET_LOADING', false)
    },
    async fetchTopSpecific({ commit }, requestedParam) {
      commit('SET_LOADING', true)

      try {
        const resp = await getFilms('v2.2', requestedParam, '/top');
        commit('SET_REQUEST_TOP', resp.data.films)
      } catch (error) {
        console.log(error)
      }

      commit('SET_LOADING', false)
    }
  }
}
