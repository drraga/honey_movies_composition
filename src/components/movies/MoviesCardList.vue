<script setup>
import MoviesCardItem from '@/components/movies/MoviesCardItem.vue';

const props = defineProps({
  movies: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <template v-for="movieData in movies" :key="movieData?.id">
    <MoviesCardItem :movie-data="movieData" />
  </template>
</template>
