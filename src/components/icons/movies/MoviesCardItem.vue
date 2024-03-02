<script setup>
import { RouterLink } from 'vue-router';
import Vue3StarRatings from 'vue3-star-ratings';

const prop = defineProps({
  movieData: {
    type: Object,
    default: () => ({}),
  },
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
      <div class="card-extended__title">
        {{ movieData.nameRu }}
      </div>
      <figure>
        <Vue3StarRatings
          :model-value="movieData.rating"
          :star-size="21"
          :number-of-stars="5"
          :show-control="false"
          :disable-click="true"
        />
      </figure>
      <time class="card-extended__release-date">
        {{ movieData.year }}
      </time>
      <div class="card-extended__genres">
        {{ movieData.genre }}
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.card-extended {
  border-radius: 18px 18px 0 0;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 25%);

  &__image {
    position: relative;
    display: block;
    width: 296px;
    height: 418px;
    border-radius: 18px 18px 0 0;
    margin-bottom: 16px;
    background: {
      size: 100%;
      repeat: no-repeat;
    }
  }

  &__inner-rating {
    display: flex;
    justify-content: center;
    position: absolute;
    right: 0;
    align-content: center;
    width: 77px;
    height: 38px;
    color: #000;
    border-radius: 0 18px;
    background-color: #f8b319;
    font: {
      size: 23px;
      weight: 600;
    }
  }
  // &__bottom{
  //   padding-left: 34px;
  // }
  &__title {
    width: 262px;
    color: #fff;
    font: {
      size: 24px;
      weight: 600;
    }
  }

  &__release-date {
    color: rgba(249, 249, 249, 70%);
    font: {
      size: 18px;
      weight: 700;
    }
  }

  &__genres {
    text-transform: capitalize;
    color: #fff;
    font: {
      size: 14px;
      weight: 600px;
    }
  }
}
</style>
