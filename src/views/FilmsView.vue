<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import BackHomeBlock from '../components/BackHomeBlock.vue';
import MoviesCardList from '../components/movies/MoviesCardList.vue';
import PreLoader from '../components/PreLoader.vue';

const store = useStore();
const route = useRoute();

const dictionary = ref({
  250: {
    title: 'Top 250',
    paramObject: {
      type: 'TOP_250_BEST_FILMS',
      page: 1,
    }
  },
  100: {
    title: 'Top 100',
    paramObject: {
      type: 'TOP_100_POPULAR_FILMS',
      page: 1,
    }
  },
  await: {
    title: 'Top Await',
    paramObject: {
      type: 'TOP_AWAIT_FILMS',
      page: 1,
    }
  }
})

const title = computed(() => dictionary.value[id.value].title);
const id = computed(() => route.params.id);
const category = computed(() => route.params.category);
const query = computed(() => dictionary.value[id.value].paramObject);

const movies = computed(() => store.getters['movies_catalog/getTopMoviesSelected']);
const isLoading = computed(() => store.getters['movies_catalog/isLoading']);

function fetchTopSpecific() {
  store.dispatch('movies_catalog/fetchTopSpecific');
};
onMounted(() => 
  fetchTopSpecific(query.value),
)

function resetMainPageState(){
  store.commit('main_page/RESET_STATE');
};
function resetCurrentPageState(){
  store.commit('movies_catalog/RESET_STATE');
};
onBeforeUnmount(() =>
  resetCurrentPageState(),
  resetMainPageState(),
)

</script>

<template>
  <main
    v-if="isLoading"
  >
    <div class="loader">
      <PreLoader />
    </div>
  </main>

  <main
    v-else
    class="request-top__wrapper"
  >
    <nav class="back-navigation">
      <BackHomeBlock />
    </nav>
    <div class="request-top__title">
      {{ title }}
    </div>
    <div class="request-top__wrapper-cards">
      <MoviesCardList :movies="movies" />
    </div>
  </main>
</template>

<style lang="scss">
.back-navigation{
  padding-bottom: 54px;
}

.request-top{
  &__wrapper{
  max-width: 1440px;
  width: 100%;
    padding: {
      top: 68px;
      left: 58px;
    }
    margin: {
      right: auto;
      left: auto;
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
