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
const { isLoading, genresSelected: movies } = storeToRefs(moviesCatalog);
const { resetState: resetCurrentPageState, fetchGenres } = moviesCatalog;

const mainPage = useMainPage();
const { getGenreSelectedName } = storeToRefs(mainPage);
const { resetState: resetMainPageState, fetchFilters } = mainPage;

const route = useRoute();

const queryGenre = computed(() => parseInt(route.params.id));
const genreSelectedName = computed(() => getGenreSelectedName.value(queryGenre.value));

onMounted(() => {
  // Запрос фильмов по выбранному жанру
  fetchGenres(queryGenre.value);
  fetchFilters();
});

onBeforeUnmount(() => resetCurrentPageState(), resetMainPageState());
</script>

<template>
  <main v-if="isLoading" class="loader">
    <PreLoaderBounce />
  </main>

  <main v-else class="genre-search">
    <nav class="back-navigation">
      <BackHomeBlock />
    </nav>

    <h1>
      {{ genreSelectedName }}
    </h1>

    <div class="genre-search__cards">
      <MoviesCardList :movies="movies" />
    </div>
  </main>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.genre-search {
  max-width: 1440px;
  padding: clamp(24px, (64 * 100 / 1440) * 1vw, 64px) clamp(12px, (38 * 100 / 1440) * 1vw, 38px);
  margin: 0 auto;

  & h1 {
    color: $primary-color-white;
    margin: 0 0 clamp(24px, 4.58vw, 66px);
    font: {
      size: clamp(22px, 3.33vw, 48px);
      weight: 800;
    }

    &::first-letter {
      text-transform: capitalize;
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px 34px;
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
