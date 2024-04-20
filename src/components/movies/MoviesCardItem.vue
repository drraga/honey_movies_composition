<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useWindowSize } from '@vueuse/core';
import Vue3StarRatings from 'vue3-star-ratings';

const prop = defineProps({
  movieData: {
    type: Object,
    default: () => ({}),
  },
});

const { width } = useWindowSize();
const starSize = computed(() => {
  if (width.value > 1151) {
    return 21;
  } else if (width.value <= 350) {
    return 18;
  } else {
    return 16;
  }
});
</script>

<template>
  <div class="card-extended">
    <RouterLink
      :to="`/films/${movieData.id}`"
      :style="{ backgroundImage: `url(${movieData.posterUrlPreview})` }"
      class="card-extended__image"
    >
      <div class="card-extended__inner-rating">
        {{ movieData.rating }}
      </div>
    </RouterLink>
    <section class="card-extended__bottom">
      <p class="card-extended__title">
        {{ movieData.nameRu }}
      </p>
      <figure>
        <Vue3StarRatings
          :model-value="movieData.rating"
          :star-size="starSize"
          :number-of-stars="5"
          :show-control="false"
          :disable-click="true"
        />
      </figure>
      <time class="card-extended__release-date">
        {{ movieData.year }}
      </time>
      <p class="card-extended__genres">
        {{ movieData.genre }}
      </p>
    </section>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/colors';
@import '@/assets/styles/_mixins';

.card-extended {
  max-width: 296px;
  border-radius: 18px 18px 0 0;
  box-shadow:
    rgba(0, 0, 0, 19%) 0 10px 20px,
    rgba(0, 0, 0, 23%) 0 6px 6px;

  &__image {
    position: relative;
    display: block;
    aspect-ratio: 3/4 auto;
    border-radius: 18px 18px 0 0;
    margin-bottom: 16px;
    background: {
      size: 100%;
      repeat: no-repeat;
    }
  }

  &__inner-rating {
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    padding: 1px 23px;
    color: #000;
    border-radius: 0 18px;
    background-color: $primary-color-yellow;
    font: {
      size: clamp(11px, (23 * 100 / 1440) * 1vw, 23px);
      weight: 600;
    }

    @include mq(350) {
      font-size: 15px;
    }
  }

  &__title {
    color: #fff;
    font: {
      size: 24px;
      weight: 600;
    }

    @include mq(1151) {
      font-size: 20px;
    }

    @include mq(767) {
      font-size: 16px;
    }

    @include mq(350) {
      font-size: 19px;
    }
  }

  &__release-date {
    color: rgba(249, 249, 249, 70%);
    font: {
      size: 18px;
      weight: 700;
    }

    @include mq(767) {
      font-size: 13px;
    }

    @include mq(350) {
      font-size: 15px;
    }
  }

  &__genres {
    text-transform: capitalize;
    color: #fff;
    font: {
      size: 14px;
      weight: 600;
    }

    @include mq(767) {
      font-size: 11px;
    }

    @include mq(350) {
      font-size: 13px;
    }
  }
}
</style>
