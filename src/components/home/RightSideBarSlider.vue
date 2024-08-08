<script setup>
import 'vue3-carousel/dist/carousel.css';

import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import { Carousel, Slide } from 'vue3-carousel';

const myCarousel = ref(null);

import HTMLSideSliderDirections from '@/assets/icons/HTMLSideSliderDirections.vue';

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

const breakpoints = {
  566: {
    itemsToShow: 1.25,
    snapAlign: 'start',
  },
};

const settings = {
  itemsToShow: 2.4,
  snapAlign: 'center',
};
</script>

<template>
  <div class="side-slider">
    <div class="side-slider__header">
      <div class="side-slider__header-left">
        <p>{{ blockName }}</p>

        <div class="side-slider__header-left--navigation">
          <button aria-label="Navigate to previous slide" @click="myCarousel.prev">
            <HTMLSideSliderDirections />
          </button>

          <button aria-label="Navigate to next slide" @click="myCarousel.next">
            <HTMLSideSliderDirections :is-right="true" />
          </button>
        </div>
      </div>

      <RouterLink :to="`${catalogUrl}`" class="side-slider__header--right">
        <p>See more</p>

        <HTMLSideSliderDirections :is-right="true" />
      </RouterLink>
    </div>

    <Carousel
      ref="myCarousel"
      class="side-slider__carousel"
      :wrap-around="true"
      :breakpoints="breakpoints"
      v-bind="settings"
    >
      <Slide v-for="slide in elementsArray" :key="slide.filmId">
        <div class="side-slider__carousel-card">
          <RouterLink :to="`films/${slide.filmId}`" class="side-slider__card-link">
            <img :src="slide.posterUrlPreview" :alt="`${slide.nameRu}. ${slide.genres?.[0]?.genre}`" />
          </RouterLink>

          <div class="side-slider__card-overlay">
            <p>{{ slide.nameRu }}</p>

            <div>
              <p>{{ slide.year }}</p>

              <p>{{ slide.genres?.[0]?.genre }}</p>
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.side-slider {
  @include mq(565) {
    padding: 0 clamp(1.25rem, 0.75rem + 1.9444vi, 2.5rem) 0 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin: 0 0 clamp(1rem, 0.75rem + 1.25vi, 1.875rem);

    @include mq(1279) {
      display: block;
    }

    @include mq(565) {
      display: flex;
      margin: 0 0 clamp(1rem, 0.75rem + 1.25vi, 1.875rem);
    }
  }

  &__header-left {
    display: flex;
    gap: clamp(1rem, 0.75rem + 0.556vi, 1.25rem);

    @include mq(1279) {
      padding: 0 0 clamp(1rem, 0.75rem + 1.25vi, 1.875rem);
    }

    @include mq(565) {
      padding: unset;
    }

    & > p {
      font-size: clamp(1.125rem, 0.75rem + 0.833vi, 1.5rem);
      font-weight: 800;
      color: $primary-color-white;

      @include mq(565) {
        font-size: 1.5rem;
      }
    }
  }

  &__header-left--navigation {
    display: flex;
    gap: 0.625rem;
    cursor: pointer;

    & > button {
      padding: 0;
      border: 0;
      background: transparent;
      cursor: pointer;
    }
  }

  &__header--right {
    display: flex;
    gap: 0.125rem;
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

      &:active {
        svg {
          transform: scale(0.8) rotate(180deg);

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
      font-size: clamp(0.813rem, 0.5rem + 0.486vi, 0.938rem);
      font-weight: 600;
      color: $grey;
      transition: color 0.25s ease;
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
    aspect-ratio: 224/100;
    border-radius: 0.75rem;
    overflow: hidden;

    @include mq(565) {
      aspect-ratio: 224/60;
    }

    & .carousel__track {
      block-size: 100%;
    }

    & .carousel__viewport {
      block-size: 100%;
    }

    & .carousel__slide {
      padding: 0 clamp(0.2rem, 0.1rem + 0.333vi, 0.4rem);
    }
  }

  &__carousel-card {
    position: relative;
    inline-size: 100%;
    block-size: 100%;
    border-radius: 0.75rem;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: $primary-overlay;
      pointer-events: none;
    }
  }

  &__card-link {
    display: flex;
    justify-content: center;
    align-items: center;
    block-size: 100%;

    & img {
      max-inline-size: 100%;
      block-size: 100%;

      @include mq(565) {
        block-size: auto;
      }
    }
  }

  &__card-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    block-size: 100%;
    padding: 0.625rem;
    border-radius: 0.75rem;
    pointer-events: none;

    & > p {
      font-size: clamp(0.688rem, 0.375rem + 0.694vi, 1rem);
      font-weight: 800;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: $primary-color-white;
      overflow: hidden;
    }

    & > div {
      display: flex;
      gap: 0.385rem;
      justify-content: space-between;
      font-size: clamp(0.625rem, 0.375rem + 0.55vi, 0.875rem);
      font-weight: 700;
      text-transform: capitalize;
      color: $grey-light;

      & > p {
        flex-shrink: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
