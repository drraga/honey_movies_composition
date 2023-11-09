<script>
import MoviesCardItem from './MoviesCardItem.vue'

export default {
  name: 'MoviesCardList',
  components: {
    MoviesCardItem
  },
  props: {
    movies: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<template>
  <div
    v-for="movieData in movies"
    :key="movieData.id"
    class="cards-extended-list"
  >
    <MoviesCardItem :movie-data="movieData" />
  </div>
</template>

<style lang="scss">

</style>
