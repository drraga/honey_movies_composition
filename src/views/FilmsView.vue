<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

import { storeToRefs } from 'pinia';
import { useMoviesCatalog } from '@/store/movies_catalog';
import { useMainPage } from '@/store/main_page';

import { useRoute } from 'vue-router';

import BackHomeBlock from '@/components/BackHomeBlock.vue';
import MoviesCardList from '@/components/movies/MoviesCardList.vue';
import PreLoader from '@/components/PreLoader.vue';

const moviesCatalog = useMoviesCatalog();
const mainPage = useMainPage();

const { isLoading, topMoviesSelected: movies } = storeToRefs(moviesCatalog);
const { fetchTopSpecific, resetState: resetCurrentPageState } = moviesCatalog;
const { resetState: resetMainPageState } = mainPage;

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
const query = computed(() => dictionary.value[id.value].paramObject);

onMounted(() => {
  fetchTopSpecific(query.value);
});

// TODO если карточка не пришла и на нее нажали. там undefined
// пушит в url undefuned. Исправить

onBeforeUnmount(() => {
  resetCurrentPageState();
  resetMainPageState();
});
</script>

<template>
  <main v-if="isLoading">
    <div class="loader">
      <PreLoader />
    </div>
  </main>

  <main v-else class="request-top">
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
  max-width: 1440px;
  padding: clamp(24px, (64 * 100 / 1440) * 1vw, 64px) clamp(12px, (38 * 100 / 1440) * 1vw, 38px);
  margin: 0 auto;

  &__title {
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

  &__wrapper-cards {
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
