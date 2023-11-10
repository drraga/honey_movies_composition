<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import BackHomeBlock from '../components/BackHomeBlock.vue';
import MoviesCardList from '../components/movies/MoviesCardList.vue';
import PreLoader from '../components/PreLoader.vue';

const store = useStore();
const route = useRoute();

const isLoading = computed(() => store.getters['movies_catalog/isLoading']);
const movies = computed(() => store.getters['movies_catalog/getGenresSelected']);
const genreSelectedName = computed(() => store.getters['main_page/getGenreSelectedName']);
const queryGenre = computed(() => route.params.id);

function fetchGenres(queryGenre) {
  store.dispatch('movies_catalog/fetchGenres', queryGenre);
}
function fetchFilters() {
  store.dispatch('main_page/fetchFilters');
};
onMounted(() =>
  fetchGenres(queryGenre.value),
  fetchFilters(),
);

function resetMainPageState() {
  store.commit('main_page/RESET_STATE');
};
function resetCurrentPageState() {
  store.commit('movies_catalog/RESET_STATE');
};
onBeforeUnmount(() =>
  resetCurrentPageState(),
  resetMainPageState(),
);
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
  max-width: 1440px;
  width: 100%;
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
