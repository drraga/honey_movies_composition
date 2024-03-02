<script setup>
import { ref } from 'vue';
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
</script>

<template>
  <div class="right-side-bar__block">
    <div class="right-side-bar__top-container">
      <div class="right-side-bar__container-left">
        <span class="right-side-bar__block-name">{{ blockName }}</span>
        <div class="right-side-bar__carousel-nav">
          <img
            class="right-side-bar__btn-left"
            src="../../assets/icons/side-block__slider-left.svg"
            alt="prev"
            @click="myCarousel.prev"
          />
          <img
            class="right-side-bar__btn-right"
            src="../../assets/icons/side-block__slider-right.svg"
            alt="next"
            @click="myCarousel.next"
          />
        </div>
      </div>
      <RouterLink :to="`${catalogUrl}`" class="right-side-bar__top-container_right">
        <span class="right-side-bar__see-more">See more</span>
        <div class="right-side-bar__btn-link">
          <img src="../../assets/icons/side-block__see-more.svg" alt="" />
        </div>
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
$primary-overlay: linear-gradient(180deg, rgba(22, 24, 30, 0%) 0%, rgba(22, 24, 30, 70%) 61.28%),
  linear-gradient(0deg, rgba(22, 24, 30, 40%), rgba(22, 24, 30, 40%));
$primary-color: #f9f9f9;
$secondary-color: #f8b319;

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
    color: $primary-color;
    margin-right: 20px;
    font: {
      size: 24px;
      weight: 800;
    }
  }

  &__carousel-nav {
    cursor: pointer;
  }

  &__btn-left {
    margin-right: 20px;
  }

  &__top-container_right {
    display: flex;
  }

  &__see-more {
    display: inline-block;
    margin-right: 10px;
    font: {
      size: 15px;
      weight: 600;
    }
  }

  &__btn-link {
    color: $primary-color;
    cursor: pointer;
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
    color: $primary-color;
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
