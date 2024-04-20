<script setup>
import { ref, computed } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { RouterLink } from 'vue-router';

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
// TODO получить значение текущего слайда и количесва слайдов, чтобы отключить кнопки навигации в крайних позициях
</script>

<template>
  <div class="right-side-bar__block">
    <div class="right-side-bar__top-container">
      <div class="right-side-bar__container-left">
        <span class="right-side-bar__block-name">{{ blockName }}</span>

        <div class="right-side-bar__carousel-nav">
          <i @click="myCarousel.prev">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 8L10 12L14 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </i>

          <i class="right-side-bar__slide-next" @click="myCarousel.next">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 8L10 12L14 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </i>
        </div>
      </div>

      <RouterLink :to="`${catalogUrl}`" class="right-side-bar__top-container_right">
        <span class="right-side-bar__see-more">See more</span>

        <i class="right-side-bar__btn-link">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 8L10 12L14 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </i>
      </RouterLink>
    </div>

    <Carousel ref="myCarousel" class="side-carousel" :items-to-show="1.25">
      <Slide v-for="slide in elementsArray" :key="slide.filmId">
        <RouterLink
          :to="`films/${slide.filmId}`"
          class="side-carousel__content"
          :style="{ backgroundImage: `url(${slide.posterUrlPreview})` }"
        >
          <div class="side-carousel__overlay">
            <div class="side-carousel__content-title">
              {{ slide.nameRu }}
            </div>

            <div class="side-carousel__content-bottom">
              <div class="side-carousel__info">
                {{ slide.year }}
              </div>

              <div class="side-carousel__genre">
                {{ slide.genres[0].genre }}
              </div>
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

.right-side-bar {
  &__block {
    width: 336px;

    &:not(:last-child) {
      margin-bottom: 60px;
    }
  }

  &__top-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    place-items: center;
  }

  &__container-left {
    display: flex;
    align-items: center;
  }

  &__block-name {
    color: $primary-color-white;
    margin-right: 20px;
    font: {
      size: 24px;
      weight: 800;
    }
  }

  &__carousel-nav {
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

      svg {
        width: 24px;

        path {
          stroke: $primary-color-white;
          transition: stroke 0.35s ease;
        }
      }
    }
  }

  &__top-container_right {
    display: flex;
    transition: color 0.25s ease;

    @media (hover: hover) {
      &:hover {
        color: $primary-color-yellow;

        svg {
          transform: scale(1.2) rotate(180deg);

          path {
            stroke: $primary-color-yellow;
          }
        }
      }
    }
  }

  &__see-more {
    display: flex;
    align-items: center;
    margin-right: 10px;
    font: {
      size: 15px;
      weight: 600;
    }
  }

  &__btn-link {
    display: flex;
    align-items: center;
    color: $primary-color-white;
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

.side-carousel {
  width: auto;
  max-width: 100%;
  border-radius: 12px;

  &__content {
    width: 100%;
    height: 130px;
    border-radius: 12px;
    margin-right: 30px;
    background: {
      position: 50%;
      repeat: no-repeat;
      size: contain;
    }
  }

  &__overlay {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    height: 100%;
    padding: 10px;
    border-radius: 12px;
    background-image: $primary-overlay;
  }

  &__content-title {
    text-align: left;
    color: $primary-color-white;
    font: {
      size: 16px;
      weight: 800;
    }
  }

  &__content-bottom {
    display: flex;
    justify-content: space-between;
    text-transform: capitalize;
    color: #f9f9f9b2;
    font: {
      size: 14px;
      weight: 700;
    }
  }
}
</style>
