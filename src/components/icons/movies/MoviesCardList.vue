<script setup>
import MoviesCardItem from './MoviesCardItem.vue';

const props = defineProps({
  movies: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div v-for="movieData in movies" :key="movieData.id" class="cards-extended-list">
    <MoviesCardItem :movie-data="movieData" />
  </div>
</template>
