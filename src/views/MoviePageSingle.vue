<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Vue3StarRatings from 'vue3-star-ratings'
import BackHomeBlock from '../components/BackHomeBlock.vue'
import PreLoader from '../components/PreLoader.vue'

export default {
  name: 'MoviePageSingle',
  components: {
    BackHomeBlock,
    Vue3StarRatings,
    PreLoader,
  },
  computed: {
    ...mapGetters('movie_single', {
      isLoading: 'isLoading',
      getMovie: 'getMovie'
    })
  },
  mounted() {
    this.fetchMovie(this.$route.params.id)
  },
  beforeUnmount() {
    this.resetCurrentPageState();
  },
  methods: {
    ...mapMutations('movie_single', {
      resetCurrentPageState: 'RESET_STATE'
    }),
    ...mapActions('movie_single', {
      fetchMovie: 'fetchMovieSingle'
    })
  }
}

</script>

<template>
  <main v-if="isLoading">
    <div class="loader">
      <PreLoader />
    </div>
  </main>
  <main
    v-else
    :style="{ backgroundImage: `url(${getMovie.posterUrl})` }"
    class="single-movie-card__wrapper"
  >
    <div class="single-movie-card__navigation">
      <BackHomeBlock />
    </div>
    <section class="single-movie-card__content">
      <div class="single-movie-card__summary">
        <div class="single-movie-card__title">
          {{ getMovie.nameRu }}
        </div>
        <Vue3StarRatings
          :model-value="getMovie.rating"
          :star-size="38"
          :number-of-stars="5"
          :show-control="false"
          :disable-click="true"
          class="single-movie-card__star-rating"
        />
        <div class="single-movie-card__critic-rating">
          {{ getMovie.ratingText }}
        </div>
        <div class="single-movie-card__description">
          {{ getMovie.description }}
        </div>
      </div>
      <div
        :style="{ backgroundImage: `url(${getMovie.posterUrlPreview})` }"
        class="single-movie-card__poster-preview"
      >
        <div class="single-movie-card__rating">
          {{ getMovie.rating }}
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
$text-color: #FFFFFF;
$primary-overlay: linear-gradient(180deg, rgba(22, 24, 30, 0) 0%, rgba(22, 24, 30, 0.7) 61.28%),
  linear-gradient(0deg, rgba(22, 24, 30, 0.4), rgba(22, 24, 30, 0.4));
  .loader{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    width: 1440px;
    height: 1024px;
    margin: {
      left: auto;
      right: auto;
    }
  }
.single-movie-card{
  &__wrapper{
    background-repeat: no-repeat;
    background-size: cover;
    width: 1440px;
    height: 1024px;
    padding-top: 150px;
    position: relative;
    margin: {
      left: auto;
      right: auto;
    }
    &:after{
      display: block;
      position: absolute;
      content: '';
      background-image: $primary-overlay;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
  &__navigation{
    position: relative;
    margin-left: 50px;
    margin-bottom: 50px;
    z-index: 1;
  }
  &__content{
    position: relative;
    display: flex;
    margin-right: 100px;
    color: $text-color;
    padding-left: 100px;
    z-index: 1;
  }
  &__title{
    font: {
      weight: 800;
      size: 68px;
    }
  }
  &__star-rating{
    margin-bottom: 28px;
  }
  &__critic-rating{
    font: {
      weight: 600;
      size: 25px;
    }
    margin-bottom: 83px;
  }
  &__poster-preview{
    position: relative;
    height: 594px;
    width: 300px;
    background-repeat: no-repeat;
    background-size: contain;
    margin-left: 100px;
    border-radius: 12px 12px 0 0;
  }
  &__description{
    font: {
      size: 30px;
      weight: 600px;
    }
    width: 652px;
    max-height: 198px;
    overflow-y: scroll;
  }
  &__rating{
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #F8B319;
    color: #000;
    border-radius: 0px 12px;
    width: calc(100% / 3);
  }
}
</style>
