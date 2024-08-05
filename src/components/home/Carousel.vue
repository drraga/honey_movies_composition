<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from 'vue-router';

import { storeToRefs } from 'pinia';
import { useMainPage } from '@/store/main_page';

import IconDirections from '@/assets/icons/IconDirections.vue';

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const mainPage = useMainPage();

const { premiers } = storeToRefs(mainPage);
</script>

<template>
  <Carousel class="main-carousel" :wrap-around="true">
    <Slide v-for="slide in premiers.slice(0, 10)" :key="slide.kinopoiskId">
      <div class="main-carousel__card">
        <RouterLink :to="`films/${slide.kinopoiskId}`" class="main-carousel__card-link">
          <img
            :src="slide.posterUrl"
            width="667"
            height="1000"
            loading="eager"
            fetchpriority="high"
            decoding="sync"
            :srcset="`${slide.posterUrl} 1x`"
            :alt="`${slide.nameRu}. ${slide?.genres?.[0]?.genre}`"
          />
        </RouterLink>

        <div class="main-carousel__card-overlay">
          <p>
            {{ slide.nameRu }}
          </p>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation>
        <template #prev>
          <IconDirections />
        </template>

        <template #next>
          <IconDirections :is-right="true" />
        </template>
      </Navigation>

      <Pagination />
    </template>
  </Carousel>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.main-carousel {
  aspect-ratio: 770/350;
  border-radius: clamp(0.625rem, 0.5rem + 0.833vi, 1.25rem);
  overflow: hidden;

  & .carousel__track {
    height: 100%;
  }

  .carousel__viewport {
    height: 100%;
  }

  &__card {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 1.25rem;

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

    & img {
      max-inline-size: 100%;
      block-size: auto;
      object-fit: contain;
    }
  }

  &__card-overlay {
    position: absolute;
    inset: 0;
    padding: clamp(0.56rem, 0.25rem + 2.5vi, 2.5rem);
    pointer-events: none;

    @include mq(390) {
      padding: 0 clamp(0.56rem, 0.25rem + 2.5vi, 2.5rem);
    }

    & p {
      font-size: clamp(0.75rem, 0.75rem + 2vi, 3.33rem);
      font-weight: 800;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: $primary-color-white;
      overflow: hidden;
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
      padding: clamp(0.125rem, 0.06rem + 0.4vi, 0.5rem) clamp(0.375rem, 0.375rem + 0.417vi, 0.75rem);
      border-radius: 0.313rem;
      background-color: $primary-background-color;
      transform: translateX(-50%);

      &-button {
        &::after {
          width: 0.625rem;
          height: 0.625rem;
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
