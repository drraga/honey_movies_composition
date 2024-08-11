<script setup>
import { ref, computed, onMounted, onBeforeUnmount, onUnmounted } from 'vue';

import { storeToRefs } from 'pinia';
import { useMovieSingle } from '@/store/movie_single';

import { useRoute } from 'vue-router';

import Vue3StarRatings from 'vue3-star-ratings';
import BackHomeBlock from '@/components/BackHomeBlock.vue';
import PreLoaderBounce from '@/components/PreLoaderBounce.vue';

const movieSingle = useMovieSingle();
const { isLoading, movieData: getMovie } = storeToRefs(movieSingle);
const { fetchMovieSingle: fetchMovie, resetState: resetCurrentPageState } = movieSingle;

const route = useRoute();

const windowWidth = ref(window.innerWidth);
const handleResize = () => (windowWidth.value = window.innerWidth);
const computedStarSize = computed(() => {
  const starSizeMax = 29;
  const starSizeMin = 13;
  const oneViewportWidth = windowWidth.value / 100;

  if (windowWidth.value >= 1440) {
    return starSizeMax;
  } else if (windowWidth.value < 600) {
    return starSizeMin;
  } else {
    return ((starSizeMax * 100) / 1440) * oneViewportWidth;
  }
});

onMounted(() => fetchMovie(route.params.id), window.addEventListener('resize', handleResize));

onBeforeUnmount(() => resetCurrentPageState());
onUnmounted(() => window.removeEventListener('resize', handleResize));
//TODO добавить переход на сам фильм или его просмотр в кинопоиске
</script>

<template>
  <main v-if="isLoading">
    <div class="loader">
      <PreLoaderBounce />
    </div>
  </main>

  <main v-else :style="{ backgroundImage: `url(${getMovie.posterUrl})` }" class="single-movie">
    <nav>
      <BackHomeBlock />
    </nav>

    <div class="single-movie__content">
      <section class="single-movie__summary">
        <h1>
          {{ getMovie.nameRu }}
        </h1>

        <Vue3StarRatings
          :model-value="getMovie.rating"
          :star-size="computedStarSize"
          :number-of-stars="5"
          :show-control="false"
          :disable-click="true"
          class="single-movie__summary--star-rating"
        />

        <p class="single-movie__summary--critic-rating">
          {{ getMovie.ratingText }}
        </p>

        <p class="single-movie__summary--description">
          {{ getMovie.description }}
        </p>
      </section>

      <div class="single-movie__card">
        <img
          :src="`${getMovie.posterUrlPreview}`"
          :alt="`${getMovie.nameRu}. ${getMovie.genre}`"
          width="300"
          height="450"
          fetchpriority="hight"
          loading="eager"
          decoding="sync"
        />

        <span>
          {{ getMovie.rating }}
        </span>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.single-movie {
  min-block-size: 100vh;
  min-block-size: 100dvh;
  padding: clamp(1.5rem, 0.75rem + 3.6111vi, 4rem) clamp(1.5rem, 0.75rem + 2.369vi, 3.125rem);
  background: no-repeat center / cover;
  margin: 0 auto;

  &::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: $primary-overlay;
  }

  & nav {
    position: relative;
    z-index: 1;
  }

  &__content {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-areas: 'description card';
    grid-template-columns: 2fr 1fr;
    gap: clamp(0.5rem, 0.5rem + 6.389vi, 6.25rem);
    justify-content: center;
    color: #fff;

    @include mq(853) {
      grid-template:
        'card' auto
        'description' auto / 1fr;
    }
  }

  &__summary {
    grid-area: description;

    & h1 {
      font: {
        weight: 800;
        size: clamp(1.375rem, 0.75rem + 3.89vi, 4.25rem);
      }
    }

    &--star-rating {
      margin-bottom: 1.944vw;
    }

    &--critic-rating {
      margin-bottom: 5.764vw;
      font: {
        weight: 600;
        size: clamp(0.75rem, 0.75rem + 0.93vi, 1.563rem);
      }
    }

    &--description {
      font: {
        size: clamp(0.813rem, 0.75rem + 1.25vi, 1.875rem);
        weight: 600;
      }

      max-height: 23.75vw;
      text-wrap: balance;
      overflow-y: scroll;

      @include mq(853) {
        max-height: unset;
      }
    }
  }

  &__card {
    grid-area: card;
    max-inline-size: 18.75rem;
    border-radius: 0.75rem 0.75rem 0 0;
    overflow: hidden;
    position: relative;

    & img {
      max-inline-size: 100%;
      block-size: auto;
      aspect-ratio: 300 /450;
      object-fit: cover;
    }

    & span {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      inline-size: calc(100% / 3);
      color: #fff;
      border-radius: 0 0.75rem;
      background-color: $primary-color-yellow;
    }
  }
}
</style>
