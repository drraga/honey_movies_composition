import { defineStore } from 'pinia';

import getFilms from '@/API/modules/films';
import mapSingleFilmRequest from '@/mapping/MapSingleFilmRequest';

export const useMovieSingle = defineStore('movie_single', {
  state: () => ({
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
    },
  }),
  actions: {
    resetState() {
      this.isLoading = false;
      this.movieData = {};
    },
    setMovieData(respData) {
      const mappedMovie = mapSingleFilmRequest(respData);

      this.movieData = {
        ...this.movieData,
        ...mappedMovie,
      };
    },
    async fetchMovieSingle(id) {
      this.isLoading = true;

      const { data } = await getFilms('v2.2', null, `/${id}`);

      this.setMovieData(data);
      this.isLoading = false;
    },
  },
});
