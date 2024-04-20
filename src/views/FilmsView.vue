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
    },
  },
  100: {
    title: 'Top 100',
    paramObject: {
      type: 'TOP_100_POPULAR_FILMS',
      page: 1,
    },
  },
  await: {
    title: 'Top Await',
    paramObject: {
      type: 'TOP_AWAIT_FILMS',
      page: 1,
    },
  },
});

const title = computed(() => dictionary.value[id.value].title);
const id = computed(() => route.params.id);
const category = computed(() => route.params.category);
const query = computed(() => dictionary.value[id.value].paramObject);

const movies = computed(() => store.getters['movies_catalog/getTopMoviesSelected']);
const isLoading = computed(() => store.getters['movies_catalog/isLoading']);

function fetchTopSpecific() {
  store.dispatch('movies_catalog/fetchTopSpecific');
}
onMounted(() => fetchTopSpecific(query.value));

function resetMainPageState() {
  store.commit('main_page/RESET_STATE');
}
function resetCurrentPageState() {
  store.commit('movies_catalog/RESET_STATE');
}

onBeforeUnmount(() => resetCurrentPageState(), resetMainPageState());
</script>

<template>
  <main v-if="isLoading">
    <div class="loader">
      <PreLoader />
    </div>
  </main>

  <main v-else class="request-top__wrapper">
    <nav class="request-top__back-navigation">
      <BackHomeBlock />
    </nav>

    <h1 class="request-top__title">
      {{ title }}
    </h1>

    <div class="request-top__wrapper-cards">
      <MoviesCardList :movies="movies" />
    </div>
  </main>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.request-top {
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
