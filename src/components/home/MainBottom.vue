<script setup>
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useStore } from 'vuex';
import Vue3StarRatings from 'vue3-star-ratings';

const store = useStore();

const moviesTop250Random = computed(() => store.getters['main_page/getMoviesTop250Random']);

function convertRating(rating) {
  return Math.round(rating) / 2
};
</script>

<template>
  <div class="main-bottom-block">
    <div
      class="main-bottom-block__title"
    >
      Top Random
    </div>
    <div class="main-bottom-block__card-wrapper">
      <div
        v-for="slide in moviesTop250Random"
        :key="slide.filmId"
        class="main-bottom-block__card"
      >
        <RouterLink
          :to="`films/${slide.filmId}`"
          class="main-bottom-block__image"
          :style=" { backgroundImage: `url(${slide.posterUrlPreview})` }"
        >
          <div class="main-bottom-block__overlay">
            <div class="main-bottom-block__card-title">
              {{ slide.nameRu }}
              <div class="rate">
                <Vue3StarRatings
                  :model-value="convertRating(slide.rating)"
                  :star-size="15"
                  :number-of-stars="5"
                  :show-control="false"
                />
              </div>
            </div>

            <div class="main-bottom-block__bottom">
              <div class="main-bottom-block__info">
                {{ slide.year }}
              </div>
              <div class="main-bottom-block__genre">
                {{ slide.genres[0].genre }}
              </div>
            </div>
          </div>
        </RouterLInk>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$primary-overlay: linear-gradient(180deg, rgba(22, 24, 30, 0) 0%, rgba(22, 24, 30, 0.7) 61.28%),
  linear-gradient(0deg, rgba(22, 24, 30, 0.4), rgba(22, 24, 30, 0.4));
$primary-color: #f9f9f9;
$secondary-color: #f8b319;

  .main-bottom-block{
    &__title{
      color: $primary-color;
      font: {
        size: 30px;
        weight: 800;
      }
      margin-bottom: 30px;
    }

    &__card-wrapper{
      display: flex;
      justify-content: space-between;
    }

    &__overlay{
      background-image: $primary-overlay;
      height: 100%;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    &__card{
      height: 300px;
      width: 238px;
    }

    &__image{
      display: block;
      height: 100%;
      width: 238px;
      border-radius: 20px;
      background: {
        size: cover;
        repeat: no-repeat;
        position: 50%;
      }
    }

    &__card-title{
      padding: 22px;
      color: $primary-color;
      overflow: clip;
      text-align: left;
      font: {
        size: 24px;
        weight: 800;
      }
    }

    &__bottom{
      display: flex;
      justify-content: space-between;
      padding: 10px;
      text-transform: capitalize;
      color: $primary-color;
      font: {
        weight: 700;
        size: 18px;
      }
    }
  }
</style>
