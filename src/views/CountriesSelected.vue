<script setup>
import { computed, onMounted, onBeforeUnmount }  from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import PreLoader from '../components/PreLoader.vue';
import MoviesCardList from '../components/movies/MoviesCardList.vue';
import BackHomeBlock from '../components/BackHomeBlock.vue'

const store = useStore();

const movies = computed(() => store.getters['movies_catalog/getCountriesSelected']);
const countryRequestedName = computed(() => store.getters['main_page/getCountriesSelectedName']);
const isLoading = computed(() => store.getters['movies_catalog/isLoading']);

const route = useRoute();
const queryCountryId = computed(() => +route.params.id);

function fetchCountries(countryId) {
  store.dispatch('movies_catalog/fetchCountries', countryId)
};
function fetchFilters() {
  store.dispatch('main_page/fetchFilters')
};

onMounted(() => 
  fetchCountries(queryCountryId.value),
  fetchFilters(),
  );

function resetMainPageState() {
  store.commit('main_page/RESET_STATE')
};
function resetCurrentPageState() {
  store.commit('movies_catalog/RESET_STATE')
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
    v-else
    class="country-search__wrapper"
  >
    <nav class="country-search__navigation">
      <BackHomeBlock />
    </nav>
    <span
      class="country-search__header"
    >
      {{ `Made in : ${countryRequestedName(queryCountryId)}` }}
    </span>
    <section class="country-search__wrapper-cards">
      <MoviesCardList :movies="movies" />
    </section>
  </main>
</template>

<style lang="scss">
@import '../assets/styles/variables.scss';

.loader{
  display: flex;
  justify-content: center;
  align-content: center;
  max-width: $max-width-page;
}

.country-search{
  &__wrapper{
  color: #000000;
  padding-top: 68px;
  padding-left: 58px;
  width: 1440px;
  min-height: 1024px;
    margin: {
      left: auto;
      right: auto;
    }
  }

  &__navigation{
    padding-bottom: 54px;
  }

  &__header{
    display: block;
    color: #F9F9F9;
    padding-bottom: 66px;
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
