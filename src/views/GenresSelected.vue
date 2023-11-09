<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import BackHomeBlock from '../components/BackHomeBlock.vue'
import MoviesCardList from '../components/movies/MoviesCardList.vue'
import PreLoader from '../components/PreLoader.vue'

export default {
  name: 'GenresSelected',
  components: {
    BackHomeBlock,
    MoviesCardList,
    PreLoader,
  },
  computed: {
    ...mapGetters('movies_catalog', {
      isLoading: 'isLoading',
      movies: 'getGenresSelected',
    }),
    ...mapGetters('main_page', {
      genreSelectedName: 'getGenreSelectedName',
    }),
    queryGenre() {
      return +this.$route.params.id
    },
  },
  mounted() {
    this.fetchGenres(this.queryGenre);
    this.fetchFilters();
  },
  beforeUnmount() {
    this.resetCurrentPageState();
    this.resetMainPageState();
  },
  methods: {
    ...mapActions('movies_catalog', {
      fetchGenres: 'fetchGenres'
    }),
    ...mapActions('main_page', {
      fetchFilters: 'fetchFilters',
    }),
    ...mapMutations('main_page', {
      resetMainPageState: 'RESET_STATE'
    }),
    ...mapMutations('movies_catalog', {
      resetCurrentPageState: 'RESET_STATE',
    })
  }
}
</script>

<template>
  <main
    v-if="isLoading"
    class="loader"
  >
    <PreLoader />
  </main>

  <main
    class="genre-search__wrapper"
  >
    <nav class="back-navigation">
      <BackHomeBlock />
    </nav>
    <div class="genre-search__title">
      {{ genreSelectedName(queryGenre) }}
    </div>
    <div class="genre-search__wrapper-cards">
      <MoviesCardList :movies="movies" />
    </div>
  </main>
</template>

<style lang="scss">
.back-navigation{
  padding-bottom: 54px;
}

.genre-search{
  &__wrapper{
  width: 1440px;
  min-height: 1024px;
    padding: {
      top: 68px;
      left: 58px;
    }
    margin: {
      left: auto;
      right: auto;
    }
  }
  &__title{
    color: #F9F9F9;
       margin-bottom: 66px;
    font: {
      size: 48px;
      weight: 800;
    }
    &:first-letter {
      text-transform: capitalize;
    }
  }
  &__wrapper-cards{
    display: flex;
    flex-wrap: wrap;
    column-gap: 34px;
    row-gap: 24px;
  }
}
</style>
