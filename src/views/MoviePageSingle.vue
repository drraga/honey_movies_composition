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
const handleResize = () => windowWidth.value = window.innerWidth;
// const starSize = computed(() => windowWidth.value * 100 / 1440);
const computedStarSize = computed(() => {
  let calculatedSize = windowWidth.value * 100 / 1440;
  return calculatedSize = Math.max(8, Math.min(calculatedSize, 38));
})

const isLoading = computed(() => store.getters['movie_single/isLoading']);
const getMovie = computed(() => store.getters['movie_single/getMovie']);

function fetchMovie(params) {
  store.dispatch('movie_single/fetchMovieSingle', params);
};
onMounted(() => 
  fetchMovie(route.params.id),
  window.addEventListener('resize', handleResize),
);

function resetCurrentPageState() {
  store.commit('movie_single/RESET_STATE');
};
onBeforeUnmount(() => 
  resetCurrentPageState(),
)
onUnmounted(() => 
window.removeEventListener('resize', handleResize)
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
    :style="{ backgroundImage: `url(${getMovie.posterUrl})` }"
    class="single-movie-card__wrapper"
  >
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
      <div
        :style="{ backgroundImage: `url(${getMovie.posterUrlPreview})` }"
        class="single-movie-card__poster-preview"
      >
        <div class="single-movie-card__rating">
          {{ getMovie.rating }}
        </div>
      </div>
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
.single-movie-card{
  &__wrapper{
    background-repeat: no-repeat;
    background-size: cover;
    max-width: $max-width-page;
    width: 100%;
    padding-top: clamp(2rem, 12vw, 10.75rem);
    padding-bottom: 18.75vw;
    position: relative;
    margin: {
      left: auto;
      right: auto;
    }
    &:after{
      display: block;
      position: absolute;
      content: '';
      background-image: $primary-overlay;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
  &__navigation{
    position: relative;
    margin-left: clamp(1rem, 3.472vw, 3.125rem);
    margin-bottom: 3.472vw;
    z-index: 1;
  }
  &__content{
    position: relative;
    display: flex;
    margin-right: 3.472vw;
    color: $color-white;
    // padding-left: 3.472vw;
    padding-left: clamp(0.5rem, 6.944vw, 6.25rem);
    z-index: 1;
  }
  &__title{
    font: {
      weight: 800;
      size: clamp( 1.1875rem, 4.722vw, 4.25rem);
    }
  }
  &__star-rating{
    margin-bottom: 1.944vw;
  }
  &__critic-rating{
    font: {
      weight: 600;
      size: 25px;
      size: clamp(0.0938rem, 1.736vw, 1.5625rem);
    }
    margin-bottom: 5.764vw;
  }
  &__poster-preview{
    position: relative;
    max-width: 300px;
    width: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    margin-left: 6.9444vw;
    border-radius: 12px 12px 0 0;
  }
  &__description{
    font: {
      size: clamp(0.5375rem ,2.083vw, 1.875rem);
      weight: 600;
    }
    max-height: 13.75vw;
    max-width: 652px;
    width: 100%;
    overflow-y: scroll;
  }
  &__rating{
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: $primary-color-yellow;
    color: $color-black;
    border-radius: 0px 12px;
    width: calc(100% / 3);
  }
}
</style>
