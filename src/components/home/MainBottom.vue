<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useMainPage } from '@/store/main_page';

import Vue3StarRatings from 'vue3-star-ratings';

import { useWindowSize } from '@vueuse/core';
const { width } = useWindowSize();

const mainPage = useMainPage();
const { moviesTop250Random } = storeToRefs(mainPage);

const convertRating = rating => Math.round(rating) / 2;

const amountOfMoviesToShow = computed(() =>
  width.value < 1152 ? moviesTop250Random.value.slice(0, 2) : moviesTop250Random.value
);
</script>

<template>
  <div class="main-bottom-block">
    <h3>Top Random</h3>

    <div class="main-bottom-block__cards">
      <div v-for="slide in amountOfMoviesToShow" :key="slide.filmId" class="main-bottom-block__card">
        <RouterLink
          :to="`films/${slide.filmId}`"
          class="main-bottom-block__card-link"
          :style="{ backgroundImage: `url(${slide.posterUrlPreview})` }"
        >
          <div class="main-bottom-block__card-overlay" />

          <div class="main-bottom-block__card-wrapper">
            <p>{{ slide.nameRu }}</p>

            <Vue3StarRatings
              :model-value="convertRating(slide.rating)"
              :star-size="15"
              :number-of-stars="5"
              :show-control="false"
            />

            <div class="main-bottom-block__details">
              <p>{{ slide.year }}</p>

              <p>{{ slide.genres[0].genre }}</p>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/_mixins';
@import '@/assets/styles/variables';

.main-bottom-block {
  & h3 {
    color: $primary-color-white;
    font: {
      size: 30px;
      weight: 800;
    }

    margin-bottom: 30px;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(12px, (24 * 100 / 1440) * 1vw, 24px);
    justify-content: space-between;

    @include mq(1152) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__card {
    position: relative;
    overflow: hidden;
  }

  &__card-link {
    display: block;
    border-radius: 20px;
    background: 50% / cover no-repeat;
  }

  &__card-overlay {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: $primary-overlay;
  }

  &__card-wrapper {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    aspect-ratio: 237/300; // TODO венуться к соотношению сторон, количеству карточек, отображение текста внутри, размеры шритов
    height: 100%;
    padding: 22px;

    & > p {
      font-size: clamp(18px, (24 / 1440) * 100vw, 24px);
      font-weight: 800;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: $primary-color-white;
      overflow: hidden;
    }
  }

  &__details {
    display: flex;
    justify-content: space-between;
    font-size: clamp(14px, (18 / 1440) * 100vw, 18px);
    font-weight: 700;
    text-transform: capitalize;
    color: $primary-color-white;
    margin-top: auto;
  }
}
</style>
