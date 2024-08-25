<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useMoviesCatalog } from '@/store/movies_catalog';
import { useMainPage } from '@/store/main_page';

import BackHomeBlock from '@/components/BackHomeBlock.vue';
import MoviesCardList from '@/components/movies/MoviesCardList.vue';
import PreLoaderBounce from '@/components/PreLoaderBounce.vue';

const moviesCatalog = useMoviesCatalog();
const mainPage = useMainPage();

const { isLoading, searchResults: movies } = storeToRefs(moviesCatalog);
const { fetchSearch, resetState: resetCurrentPageState } = moviesCatalog;
const { resetState: resetMainPageState } = mainPage;

const route = useRoute();

const queryGenre = computed(() => route.params.id);

onMounted(() => fetchSearch(queryGenre.value));
onBeforeUnmount(() => resetMainPageState(), resetCurrentPageState());
</script>

<template>
  <main v-if="isLoading">
    <div class="loader">
      <PreLoaderBounce />
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
    padding: clamp(1.5rem, 0.75rem + 3.6111vi, 4rem) clamp(1.5rem, 0.75rem + 2.369vi, 3.125rem);
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

    &:hover > :not(:hover) {
      opacity: 0.5;
    }
  }
}
</style>
