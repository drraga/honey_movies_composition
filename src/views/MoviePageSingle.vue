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

  <main v-else :style="{ backgroundImage: `url(${getMovie.posterUrl})` }" class="single-movie__wrapper">
    <div class="single-movie__navigation">
      <BackHomeBlock />
    </div>

    <section class="single-movie__content">
      <div class="single-movie__summary">
        <p class="single-movie__summary--title">
          {{ getMovie.nameRu }}
        </p>

        <Vue3StarRatings
          :model-value="getMovie.rating"
          :star-size="computedStarSize"
          :number-of-stars="5"
          :show-control="false"
          :disable-click="true"
          class="single-movie__summary--star-rating"
        />

        <div class="single-movie__summary--critic-rating">
          {{ getMovie.ratingText }}
        </div>

        <div class="single-movie__summary--description">
          {{ getMovie.description }}
        </div>
      </div>

      <div class="single-movie__card">
        <div :style="{ backgroundImage: `url(${getMovie.posterUrlPreview})` }">
          <div class="single-movie__card--rating">
            {{ getMovie.rating }}
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.single-movie {
  &__wrapper {
    min-height: 100vh;
    min-height: 100dvh;
    padding: clamp(24px, (64 * 100 / 1440) * 1vw, 64px) clamp(25px, (50 * 100 / 1440) * 1vw, 50px);
    background: no-repeat center / cover;
    margin: 0 auto;

    &::after {
      content: '';
      position: fixed;
      inset: 0;
      display: block;
      background-image: $primary-overlay;
    }
  }

  &__navigation {
    position: relative;
    z-index: 1;
  }

  &__content {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-areas: 'description card';
    grid-template-columns: 2fr 1fr;
    gap: clamp(8px, (100 * 100 / 1440) * 1vw, 100px);
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

    &--title {
      font: {
        weight: 800;
        size: clamp(22px, (68 * 100 / 1440) * 1vw, 68px);
      }
    }

    &--star-rating {
      margin-bottom: 1.944vw;
    }

    &--critic-rating {
      margin-bottom: 5.764vw;
      font: {
        weight: 600;
        size: clamp(12px, (25 * 100 / 1440) * 1vw, 25px);
      }
    }

    &--description {
      font: {
        size: clamp(13px, (30 * 100 / 1440) * 1vw, 30px);
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
    max-width: 300px;

    > div {
      position: relative;
      width: 100%;
      padding: calc((300 / 200) * 100%) 0 0;
      border-radius: 12px 12px 0 0;
      background: no-repeat center / cover;
    }

    &--rating {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(100% / 3);
      color: #fff;
      border-radius: 0 12px;
      background-color: $primary-color-yellow;
    }
  }
}
</style>
