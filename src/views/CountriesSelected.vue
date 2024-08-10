<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue';

import { storeToRefs } from 'pinia';
import { useMoviesCatalog } from '@/store/movies_catalog';
import { useMainPage } from '@/store/main_page';

import { useRoute } from 'vue-router';

const moviesCatalog = useMoviesCatalog();
const { isLoading, countriesSelected: movies } = storeToRefs(moviesCatalog);
const { fetchCountries, resetState: resetCurrentPageState } = moviesCatalog;

const mainPage = useMainPage();
const { getCountriesSelectedName: countryRequestedName } = storeToRefs(mainPage);
const { fetchFilters, resetState: resetMainPageState } = mainPage;

import PreLoaderBounce from '@/components/PreLoaderBounce.vue';
import MoviesCardList from '@/components/movies/MoviesCardList.vue';
import BackHomeBlock from '@/components/BackHomeBlock.vue';

const route = useRoute();
const queryCountryId = computed(() => parseInt(route.params.id));

onMounted(() => {
  fetchCountries(queryCountryId.value);
  fetchFilters();
});

onBeforeUnmount(() => {
  resetCurrentPageState();
  resetMainPageState();
});
</script>

<template>
  <main v-if="isLoading" class="loader">
    <PreLoaderBounce />
  </main>

  <main v-else class="country-search">
    <nav class="country-search__navigation">
      <BackHomeBlock />
    </nav>

    <h1>
      {{ `Made in : ${countryRequestedName(queryCountryId)}` }}
    </h1>

    <section class="country-search__cards">
      <MoviesCardList :movies="movies" />
    </section>
  </main>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.country-search {
  max-width: 1440px;
  padding: clamp(24px, (64 * 100 / 1440) * 1vw, 64px) clamp(12px, (38 * 100 / 1440) * 1vw, 38px);
  margin: 0 auto;

  & h1 {
    display: block;
    margin: 0 0 clamp(24px, 4.58vw, 66px);
    color: $grey;
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
