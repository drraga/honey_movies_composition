<script setup>
import 'vue3-carousel/dist/carousel.css';

import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import { Carousel, Slide } from 'vue3-carousel';

const myCarousel = ref(null);

const props = defineProps({
  catalogUrl: {
    type: String,
    required: true,
  },
  blockName: {
    type: String,
    required: true,
  },
  elementsArray: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="side-slider">
    <div class="side-slider__header">
      <div class="side-slider__header--left">
        <p>{{ blockName }}</p>

        <div class="side-slider__header--navigation">
          <i @click="myCarousel.prev">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 8L10 12L14 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </i>

          <i @click="myCarousel.next">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 8L10 12L14 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </i>
        </div>
      </div>

      <RouterLink :to="`${catalogUrl}`" class="side-slider__header--right">
        <p>See more</p>

        <i>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8L10 12L14 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </i>
      </RouterLink>
    </div>

    <Carousel ref="myCarousel" class="side-slider__carousel" :items-to-show="1.25">
      <Slide v-for="slide in elementsArray" :key="slide.filmId">
        <RouterLink
          :to="`films/${slide.filmId}`"
          class="side-slider__carousel-card"
          :style="{ backgroundImage: `url(${slide.posterUrlPreview})` }"
        >
          <div class="side-slider__carousel-card--wrapper">
            <p>{{ slide.nameRu }}</p>

            <div>
              <div>{{ slide.year }}</div>

              <div>{{ slide.genres[0].genre }}</div>
            </div>
          </div>
        </RouterLink>
      </Slide>
    </Carousel>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.side-slider {
  &__header {
    display: flex;
    justify-content: space-between;
    margin: 0 0 clamp(15px, (30 / 1440) * 100vw, 30px);

    @include mq(1279) {
      display: block;
    }
  }

  &__header--left {
    display: flex;

    @include mq(1279) {
      padding: 0 0 20px;
    }

    & > p {
      color: $primary-color-white;
      margin-right: 20px;
      font: {
        size: 24px;
        weight: 800;
      }
    }
  }

  &__header--navigation {
    display: flex;
    gap: 10px;
    cursor: pointer;

    > i {
      display: flex;
      align-items: center;
      transform: translate3d(0, 0, 0);
      transition: transform 0.35s ease;

      &:last-child {
        svg {
          transform: rotate(180deg);
        }
      }

      @media (hover: hover) {
        &:hover {
          transform: scale(1.2);

          svg {
            path {
              stroke: $primary-color-yellow;
            }
          }
        }
      }

      @media (hover: none) {
        &:active {
          transform: scale(0.8);

          svg {
            path {
              stroke: $primary-color-yellow;
            }
          }
        }
      }

      svg {
        width: 24px;

        path {
          stroke: $primary-color-white;
          transition: stroke 0.35s ease;
        }
      }
    }
  }

  &__header--right {
    display: flex;
    transition: color 0.25s ease;

    @media (hover: hover) {
      &:hover {
        p {
          color: $primary-color-yellow;
        }

        svg {
          transform: scale(1.2) rotate(180deg);

          path {
            stroke: $primary-color-yellow;
          }
        }
      }
    }

    @media (hover: none) {
      &:active {
        svg {
          transform: scale(0.8) rotate(180deg);

          path {
            stroke: $primary-color-yellow;
          }
        }
      }
    }

    & > p {
      display: flex;
      align-items: center;
      color: $grey;
      transition: color 0.25s ease;
      margin-right: 10px;
      font: {
        size: 15px;
        weight: 600;
      }
    }

    & > i {
      display: flex;
      align-items: center;
      cursor: pointer;

      svg {
        width: 24px;
        transform: rotate(180deg);
        transition: transform 0.25s ease;

        path {
          stroke: $primary-color-white;
          transition: stroke 0.25s ease;
        }
      }
    }
  }

  &__carousel {
    max-width: calc((335 / 1440) * 100vw);
    border-radius: 12px;
  }

  &__carousel-card {
    width: 100%;
    border-radius: 12px;
    // aspect-ratio: 210 / 129; // TODO необходимо решить как отображать правильнее
    background: 50% / contain no-repeat;
    margin-right: 30px;

    &--wrapper {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      height: 100%;
      padding: 10px;
      border-radius: 12px;
      background-image: $primary-overlay;

      & > p {
        font-weight: 800;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: $primary-color-white;
        margin: 0 0 62px;
        overflow: hidden;
      }

      & > div {
        display: flex;
        justify-content: space-between;
        text-transform: capitalize;
        color: $grey-light;
        font: {
          size: 14px;
          weight: 700;
        }
      }
    }
  }
}
</style>
