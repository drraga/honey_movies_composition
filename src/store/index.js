import { createStore } from 'vuex'
import mainPage from './modules/main_page'
import moviesCatalog from './modules/movies_catalog'
import movieSingle from './modules/movie_single'

export default createStore({
  modules: {
    main_page: mainPage,
    movies_catalog: moviesCatalog,
    movie_single: movieSingle,
  }
})
