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
  store.dispatch('movies_catalog/fetchSearch', queryGenre)
};
onMounted(() => 
  fetchSearch(queryGenre.value),
);

function resetCurrentPageState() {
  store.commit('movies_catalog/RESET_STATE');
};
function resetMainPageState() {
  store.commit('main_page/RESET_STATE');
};
onBeforeUnmount(() => 
  resetMainPageState(),
  resetCurrentPageState(),
);

</script>

<template>
  <main v-if="isLoading">
    <div class="loader">
      <PreLoader />
    </div>
  </main>

  <main
    v-else
    class="search-result__wrapper"
  >
    <nav class="back-navigation">
      <BackHomeBlock />
    </nav>
    <span class="search-result__title">
      {{ `Search results "${queryGenre}":` }}
    </span>
    <section
      class="search-result__wrapper-cards"
    >
      <MoviesCardList :movies="movies" />
    </section>
  </main>
</template>

<style lang="scss">
.loader{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    width: 1440px;
    height: 1024px;
    margin: {
      left: auto;
      right: auto;
    }
}

.back-navigation {
  padding-bottom: 64px;
}

.search-result{
  &__wrapper{
  color: #000000;
  padding-top: 68px;
  padding-left: 48px;
  width: 1440px;
  min-height: 1024px;
    margin: {
      left: auto;
      right: auto;
    }
  }
  &__title{
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
