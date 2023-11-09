import getFilms from '../../API/modules/films'
import mapSingleFilmRequest from '../../mapping/MapSingleFilmRequest'

export default {
  namespaced: true,
  state: {
    isLoading: true,
    movieData: {
      id: 0,
      nameRu: null,
      rating: null,
      ratingAwait: null,
      ratingText: null,
      year: 0,
      genre: null,
      country: null,
      posterUrl: null,
      posterUrlPreview: null,
      description: null,
    }
  },
  getters: {
    isLoading: (state) => state.isLoading,
    getMovie: (state) => state.movieData
  },
  mutations: {
    SET_LOADING(state, loadingState) {
      state.isLoading = loadingState
    },
    RESET_STATE(state) {
      state.isLoading = false;
      state.movieData = {};
    },
    SET_MOVIE_DATA(state, respData) {
      const mappedMovie = mapSingleFilmRequest(respData)

      state.movieData = {
        ...state.movieData,
        ...mappedMovie
      }
    }
  },
  actions: {
    async fetchMovieSingle({ commit }, id) {
      commit('SET_LOADING', true)
      const { data } = await getFilms('v2.2', null, `/${id}`)

      commit('SET_MOVIE_DATA', data)
      commit('SET_LOADING', false)
    }
  }
}
