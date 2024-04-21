<script setup>
import { ref, computed, onMounted, onBeforeUnmount, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Vue3StarRatings from 'vue3-star-ratings';
import BackHomeBlock from '../components/BackHomeBlock.vue';
import PreLoader from '../components/PreLoader.vue';

const store = useStore();
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

const isLoading = computed(() => store.getters['movie_single/isLoading']);
const getMovie = computed(() => store.getters['movie_single/getMovie']);

function fetchMovie(params) {
  store.dispatch('movie_single/fetchMovieSingle', params);
}

onMounted(() => fetchMovie(route.params.id), window.addEventListener('resize', handleResize));

function resetCurrentPageState() {
  store.commit('movie_single/RESET_STATE');
}

onBeforeUnmount(() => resetCurrentPageState());
onUnmounted(() => window.removeEventListener('resize', handleResize));
//TODO добаивть переход на сам фильм или его просмотр в кинопоиске
</script>

<template>
  <main v-if="isLoading">
    <div class="loader">
      <PreLoader />
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
    padding: clamp(32px, (172 * 100 / 1440) * 1vw, 172px) clamp(25px, (50 * 100 / 1440) * 1vw, 50px);
    background: no-repeat center / cover;

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
    display: flex;
    gap: clamp(8px, (100 * 100 / 1440) * 1vw, 100px);
    justify-content: center;
    color: #fff;
  }

  &__summary {
    flex-basis: 65%;

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
      overflow-y: scroll;
    }
  }

  &__card {
    flex-basis: 35%;
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
