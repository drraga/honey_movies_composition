<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useMainPage } from '@/store/main_page';

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const mainPage = useMainPage();

const { premiers } = storeToRefs(mainPage);

const primaryOverlay = ref(
  `linear-gradient(180deg, rgba(22, 24, 30, 0%) 0%, rgba(22, 24, 30, 7%) 61.28%),
  linear-gradient(0deg, rgba(22, 24, 30, 4%), rgba(22, 24, 30, 4%));`
);
</script>

<template>
  <Carousel class="main-carousel" :wrap-around="true">
    <Slide v-for="slide in premiers.slice(0, 10)" :key="slide.kinopoiskId">
      <RouterLink
        :to="`films/${slide.kinopoiskId}`"
        class="main-carousel__card"
        :style="[{ backgroundImage: `url(${slide.posterUrl})` }, primaryOverlay]"
      >
        <div class="main-carousel__card--overlay" />

        <p class="main-carousel__card--title">
          {{ slide.nameRu }}
        </p>
      </RouterLink>
    </Slide>

    <template #addons>
      <Navigation>
        <template #prev>
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
        </template>
      </Navigation>

      <Pagination />
    </template>
  </Carousel>
</template>

<style lang="scss">
// TODO удалить лишние переменные
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.main-carousel {
  width: auto;
  max-width: 100%;
  aspect-ratio: 740/350;
  border-radius: 20px;
  overflow: hidden;

  & .carousel__track {
    height: 100%;
  }

  .carousel__viewport {
    height: 100%;
  }

  &__card {
    display: flex;
    width: 100%;
    position: relative;
    height: 100%;
    padding: clamp(20px, (40 / 1440) * 100vw, 40px);
    border-radius: 20px;
    background: 50% / contain no-repeat;

    &--overlay {
      position: absolute;
      inset: 0;
      border-radius: 20px;
      background: $primary-overlay;
    }

    &--title {
      position: relative;
      z-index: 1;
      color: $primary-color-white;
      font-weight: 800;
      font-size: clamp(21px, (48 / 1440) * 100vw, 48px);
    }
  }

  &__btn-control {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: clamp(11px, 0.9vw, 13px);
    border-radius: clamp(12px, 1.04vw, 15px);
    background-color: $primary-background-color;
    transition:
      transform 0.15s ease,
      background 0.25s ease;

    @media (hover: hover) {
      &:hover {
        svg {
          fill: $primary-color-yellow;
          transform: scale(1.1) translate3d(0, 0, 0);
        }

        &.next {
          svg {
            transform: scale(1.1) translate3d(0, 0, 0) rotate(180deg);
          }
        }

        &:active {
          svg {
            fill: $primary-color-yellow;
            transform: scale(0.98) translate3d(0, 0, 0);
          }

          &.next {
            svg {
              transform: scale(0.98) translate3d(0, 0, 0) rotate(180deg);
            }
          }
        }
      }
    }

    @media (hover: none) {
      &:active {
        background: $primary-color-yellow;
        transform: scale(0.95);
      }
    }

    &.next {
      svg {
        transform: rotate(180deg);
      }
    }

    svg {
      width: clamp(18px, 1.74vw, 25px);
      fill: #fff;
      transform: translate3d(0, 0, 0);
      transition:
        transform 0.25s ease,
        fill 0.25s ease;
    }
  }

  .carousel {
    &__prev {
      left: 3%;
    }

    &__next {
      right: 3%;
    }

    &__pagination {
      position: absolute;
      bottom: 10%;
      left: 50%;
      padding: 8px 12px;
      border-radius: 5px;
      transform: translateX(-50%);
      background-color: $primary-background-color;

      &-button {
        &::after {
          width: 10px;
          height: 10px;
          border-radius: 50em;
          background-color: $primary-color-white;
        }

        &--active {
          &::after {
            background-color: $primary-color-yellow;
          }
        }
      }
    }
  }
}
</style>
