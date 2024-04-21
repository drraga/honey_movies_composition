<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { RouterLink } from 'vue-router';

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const store = useStore();

const premiers = computed(() => store.getters['main_page/getPremiers'].slice(0, 10));

const primaryOverlay = ref(
  `linear-gradient(180deg, rgba(22, 24, 30, 0) 0%, rgba(22, 24, 30, 0.7) 61.28%),
  linear-gradient(0deg, rgba(22, 24, 30, 0.4), rgba(22, 24, 30, 0.4));`
);
</script>

<template>
  <Carousel class="main-carousel">
    <Slide v-for="slide in premiers" :key="slide.kinopoiskId">
      <RouterLink
        :to="`films/${slide.kinopoiskId}`"
        class="main-carousel__content"
        :style="[{ backgroundImage: `url(${slide.posterUrl})` }, primaryOverlay]"
      >
        <div class="main-carousel__overlay">
          <p class="main-carousel__title">
            {{ slide.nameRu }}
          </p>
        </div>
      </RouterLink>
    </Slide>

    <template #addons>
      <Navigation>
        <template #prev>
          <!-- <div class="main-carousel__btn-control">
            <img src="@/assets/icons/next.svg" alt="next" />
          </div> -->
          <div class="main-carousel__btn-control">
            <svg viewBox="-128 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
              />
            </svg>
          </div>
        </template>

        <template #next>
          <div class="main-carousel__btn-control next">
            <svg viewBox="-128 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
              />
            </svg>
          </div>

          <!-- <div class="main-carousel__btn-control">
            <img src="@/assets/icons/previous.svg" alt="prev" />
          </div> -->
        </template>
      </Navigation>

      <Pagination />
    </template>
  </Carousel>
</template>

<style lang="scss">
// TODO удалить лишние перменные
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';
$primary-overlay: linear-gradient(180deg, rgba(22, 24, 30, 0%) 0, rgba(22, 24, 30, 70%) 61.28%),
  linear-gradient(0deg, rgba(22, 24, 30, 40%), rgba(22, 24, 30, 40%));
$primary-background-color: rgba(249, 249, 249, 20%);
$primary-color: #f9f9f9;
// $primary-color-yellow: #f8b319;

.main-carousel {
  width: auto;
  max-width: 100%;
  height: 350px;
  border-radius: 20px;
  overflow: hidden;

  &__content {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: {
      position: 50%;
      repeat: no-repeat;
      size: contain;
    }
  }

  // &__btn-control {
  //   display: flex;
  //   padding: 17px 20px;
  //   border-radius: 15px;
  //   background-color: $primary-background-color;
  // }

  &__btn-control {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: clamp(11px, 0.9vw, 13px);
    border-radius: clamp(12px, 1.04vw, 15px);
    background-color: $primary-background-color;
    transition:
      transform 0.25s ease,
      background 0.25s ease;

    &.next {
      svg {
        transform: rotate(180deg);
      }
    }

    @media (hover: hover) {
      &:hover {
        background: $primary-color-yellow;
        transform: scale(1.05);
      }
    }

    @media (hover: none) {
      &:active {
        background: $primary-color-yellow;
        transform: scale(0.95);
      }
    }

    svg {
      width: clamp(18px, 1.74vw, 25px);
      fill: #fff;
      transition:
        transform 0.25s ease,
        fill 0.25s ease;
    }
  }

  .carousel {
    &__prev {
      left: 20px;
    }

    &__next {
      right: 20px;
    }

    &__pagination {
      position: absolute;
      bottom: 36px;
      left: 283px;
      padding: 8px 12px;
      border-radius: 5px;
      background-color: $primary-background-color;

      &-button {
        &::after {
          width: 10px;
          height: 10px;
          border-radius: 50em;
          background-color: $primary-color;
        }

        &--active {
          &::after {
            background-color: $primary-color-yellow;
          }
        }
      }
    }
  }

  &__overlay {
    height: 350px;
    border-radius: 20px;
    background: $primary-overlay;
  }

  &__title {
    position: absolute;
    top: 40px;
    left: 40px;
    line-height: 48px;
    text-align: left;
    color: $primary-color;
    font: {
      weight: 800;
      size: 48px;
    }
  }
}
</style>
