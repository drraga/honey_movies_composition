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
    <nav class="search-result__back-navigation">
      <BackHomeBlock />
    </nav>

    <h1 class="search-result__title">
      {{ `Search results "${queryGenre}":` }}
    </h1>

    <section class="search-result__wrapper-cards">
      <MoviesCardList :movies="movies" />
    </section>
  </main>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.search-result {
  &__wrapper {
    max-width: 1440px;
    padding: clamp(24px, (64 * 100 / 1440) * 1vw, 64px) clamp(12px, (38 * 100 / 1440) * 1vw, 38px);
    margin: {
      left: auto;
      right: auto;
    }
  }

  &__title {
    color: $primary-color-white;
    margin-bottom: clamp(24px, 4.58vw, 66px);
    font: {
      size: clamp(22px, 3.33vw, 48px);
      weight: 800;
    }

    &::first-letter {
      text-transform: capitalize;
    }
  }

  &__wrapper-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px 34px;
    flex-wrap: wrap;
    justify-content: center;

    @include mq(1151) {
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    @include mq(767) {
      grid-template-columns: repeat(2, 1fr);
      gap: clamp(12px, (24 * 100 / 1440) * 1vw, 24px);
    }

    @include mq(350) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
}
</style>
