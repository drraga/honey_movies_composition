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
  <section class="main-bottom-block">
    <h3>Top Random</h3>

    <div class="main-bottom-block__cards">
      <div v-for="slide in amountOfMoviesToShow" :key="slide.filmId" class="main-bottom-block__card">
        <RouterLink :to="`films/${slide.filmId}`" class="main-bottom-block__card-link">
          <img
            :src="slide.posterUrlPreview"
            :alt="`${slide.nameRu}. ${slide.genres?.[0]?.genre}`"
            width="360"
            height="512"
            loading="eager"
            decoding="sync"
            :srcset="`${slide.posterUrlPreview} 1x`"
          />
        </RouterLink>

        <div class="main-bottom-block__card-overlay">
          <p>{{ slide.nameRu }}</p>

          <Vue3StarRatings
            :model-value="convertRating(slide.rating)"
            :star-size="15"
            :number-of-stars="5"
            :show-control="false"
          />

          <div class="main-bottom-block__card-overlay--details">
            <p>{{ slide.year }}</p>

            <p>{{ slide.genres[0].genre }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@import '@/assets/styles/_mixins';
@import '@/assets/styles/variables';

.main-bottom-block {
  @include mq(565) {
    margin: 0 0 clamp(0.625rem, 0.75rem + 1.25vi, 1.875rem);
  }

  & h3 {
    font-size: clamp(1.5rem, 0.5rem + 1.736vi, 1.875rem);
    font-weight: 800;
    color: $primary-color-white;
    margin: 0 0 clamp(0.95rem, 0.5rem + 1.53vi, 1.875rem);
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(0.75rem, 0.75rem + 0.833vi, 1.5rem);
    justify-content: space-between;

    @include mq(1152) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__card {
    position: relative;
    border-radius: clamp(0.625rem, 0.5rem + 0.833vi, 1.25rem);
    overflow: hidden;
    aspect-ratio: 237/300;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: $primary-overlay;
      pointer-events: none;
    }
  }

  &__card-link {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: inherit;

    & img {
      max-inline-size: 100%;
      block-size: auto;
      aspect-ratio: 237/300;
      object-fit: cover;
    }
  }

  &__card-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: clamp(0.56rem, 0.25rem + 1.25vi, 1.375rem);
    pointer-events: none;

    @include mq(390) {
      padding: 0 clamp(0.56rem, 0.25rem + 1.25vi, 1.375rem);
    }

    & > p {
      font-size: clamp(1rem, 0.5rem + 1.11vi, 1.5rem);
      font-weight: 800;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: $primary-color-white;
      overflow: hidden;
    }
  }

  &__card-overlay--details {
    display: flex;
    gap: 0.125rem;
    justify-content: space-between;
    font-size: clamp(0.813rem, 0.5rem + 0.694vi, 1.125rem);
    font-weight: 700;
    text-transform: capitalize;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-block-start: auto;

    @include mq(490) {
      display: unset;
    }
  }
}
</style>
