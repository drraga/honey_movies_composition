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
  let calculatedSize = (windowWidth.value * 100) / 1440;
  return (calculatedSize = Math.max(8, Math.min(calculatedSize, 38)));
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
</script>

<template>
  <main v-if="isLoading">
    <div class="loader">
      <PreLoader />
    </div>
  </main>
  <main v-else :style="{ backgroundImage: `url(${getMovie.posterUrl})` }" class="single-movie-card__wrapper">
    <div class="single-movie-card__navigation">
      <BackHomeBlock />
    </div>
    <section class="single-movie-card__content">
      <div class="single-movie-card__summary">
        <div class="single-movie-card__title">
          {{ getMovie.nameRu }}
        </div>
        <Vue3StarRatings
          :model-value="getMovie.rating"
          :star-size="computedStarSize"
          :number-of-stars="5"
          :show-control="false"
          :disable-click="true"
          class="single-movie-card__star-rating"
        />
        <div class="single-movie-card__critic-rating">
          {{ getMovie.ratingText }}
        </div>
        <div class="single-movie-card__description">
          {{ getMovie.description }}
        </div>
      </div>
      <div :style="{ backgroundImage: `url(${getMovie.posterUrlPreview})` }" class="single-movie-card__poster-preview">
        <div class="single-movie-card__rating">
          {{ getMovie.rating }}
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
@import '../assets/styles/variables.scss';

.loader {
  display: flex;
  place-content: center;
  max-width: $max-width-page;
}

.single-movie-card {
  &__wrapper {
    position: relative;
    width: 100%;
    max-width: $max-width-page;
    padding-top: clamp(2rem, 12vw, 10.75rem);
    padding-bottom: 18.75vw;
    background-repeat: no-repeat;
    background-size: cover;
    margin: {
      left: auto;
      right: auto;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      display: block;
      background-image: $primary-overlay;
    }
  }

  &__navigation {
    position: relative;
    z-index: 1;
    margin-bottom: 3.472vw;
    margin-left: clamp(1rem, 3.472vw, 3.125rem);
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    padding-left: clamp(0.5rem, 6.944vw, 6.25rem);
    color: #fff;
    margin-right: 3.472vw;
  }

  &__title {
    font: {
      weight: 800;
      size: clamp(1.1875rem, 4.722vw, 4.25rem);
    }
  }

  &__star-rating {
    margin-bottom: 1.944vw;
  }

  &__critic-rating {
    margin-bottom: 5.764vw;
    font: {
      weight: 600;
      size: clamp(0.0938rem, 1.736vw, 1.5625rem);
    }
  }

  &__poster-preview {
    position: relative;
    width: 100%;
    max-width: 300px;
    border-radius: 12px 12px 0 0;
    background-repeat: no-repeat;
    background-size: contain;
    margin-left: 6.9444vw;
  }

  &__description {
    font: {
      size: clamp(0.5375rem, 2.083vw, 1.875rem);
      weight: 600;
    }

    width: 100%;
    max-width: 652px;
    max-height: 13.75vw;
    overflow-y: scroll;
  }

  &__rating {
    position: absolute;
    right: 0;
    display: flex;
    place-content: center;
    width: calc(100% / 3);
    color: #fff;
    border-radius: 0 12px;
    background-color: $primary-color-yellow;
  }
}
</style>
