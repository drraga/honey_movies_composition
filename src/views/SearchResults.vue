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
const movies = computed(() => store.getters['movies_catalog/getSearchResults']);

const queryGenre = computed(() => route.params.id);
function fetchSearch(queryGenre) {
  store.dispatch('movies_catalog/fetchSearch', queryGenre);
}
onMounted(() => fetchSearch(queryGenre.value));

function resetCurrentPageState() {
  store.commit('movies_catalog/RESET_STATE');
}
function resetMainPageState() {
  store.commit('main_page/RESET_STATE');
}
onBeforeUnmount(() => resetMainPageState(), resetCurrentPageState());
</script>

<template>
  <main v-if="isLoading">
    <div class="loader">
      <PreLoader />
    </div>
  </main>

  <main v-else class="search-result__wrapper">
    <nav class="back-navigation">
      <BackHomeBlock />
    </nav>
    <span class="search-result__title">
      {{ `Search results "${queryGenre}":` }}
    </span>
    <section class="search-result__wrapper-cards">
      <MoviesCardList :movies="movies" />
    </section>
  </main>
</template>

<style lang="scss">
@import '../assets/styles/variables.scss';

.loader {
  display: flex;
  place-content: center;
  max-width: $max-width-page;
}

.back-navigation {
  padding-bottom: 64px;
}

.search-result {
  &__wrapper {
    max-width: $max-width-page;
    padding-top: 4.722vw;
    padding-left: 3.333vw;
    color: $color-black;
    margin: {
      left: auto;
      right: auto;
    }
  }

  &__title {
    display: block;
    padding-bottom: 66px;
    color: $primary-color-white;
    font: {
      size: 48px;
      weight: 800;
    }

    &::first-letter {
      text-transform: capitalize;
    }
  }

  &__wrapper-cards {
    display: flex;
    gap: 24px 34px;
    flex-wrap: wrap;
  }
}
</style>
