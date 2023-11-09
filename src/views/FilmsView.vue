<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import BackHomeBlock from '../components/BackHomeBlock.vue'
import MoviesCardList from '../components/movies/MoviesCardList.vue'
import PreLoader from '../components/PreLoader.vue'

export default {
  name: 'FilmsView',
  components: {
    BackHomeBlock,
    MoviesCardList,
    PreLoader,
  },
  data() {
    return {
      dictionary: {
        250: {
          title: 'Top 250',
          paramObject: {
            type: 'TOP_250_BEST_FILMS',
            page: 1,
          }
        },
        100: {
          title: 'Top 100',
          paramObject: {
            type: 'TOP_100_POPULAR_FILMS',
            page: 1,
          }
        },
        await: {
          title: 'Top Await',
          paramObject: {
            type: 'TOP_AWAIT_FILMS',
            page: 1,
          }
        }
      }
    }
  },
  computed: {
    title() {
      return this.dictionary[this.id].title
    },
    category() {
      return this.$route.params.category
    },
    id() {
      return this.$route.params.id
    },
    query() {
      return this.dictionary[this.id].paramObject
    },
    ...mapGetters('movies_catalog', {
      movies: 'getTopMoviesSelected',
      isLoading: 'isLoading',
    })
  },
  mounted() {
    this.fetchTopSpecific(this.query)
  },
  beforeUnmount() {
    this.resetCurrentPageState();
    this.resetMainPageState();
  },
  methods: {
    ...mapActions('movies_catalog', {
      fetchTopSpecific: 'fetchTopSpecific',
    }),
    ...mapMutations('main_page', {
      resetMainPageState: 'RESET_STATE'
    }),
    ...mapMutations('movies_catalog', {
      resetCurrentPageState: 'RESET_STATE',
    })
  }
}
</script>

<template>
  <main
    v-if="isLoading"
  >
    <div class="loader">
      <PreLoader />
    </div>
  </main>

  <main
    v-else
    class="request-top__wrapper"
  >
    <nav class="back-navigation">
      <BackHomeBlock />
    </nav>
    <div class="request-top__title">
      {{ title }}
    </div>
    <div class="request-top__wrapper-cards">
      <MoviesCardList :movies="movies" />
    </div>
  </main>
</template>

<style lang="scss">
.back-navigation{
  padding-bottom: 54px;
}

.request-top{
  &__wrapper{
  width: 1440px;
  min-height: 1024px;
    padding: {
      top: 68px;
      left: 58px;
    }
    margin: {
      right: auto;
      left: auto;
    }
  }

  &__title{
    color: #F9F9F9;
       margin-bottom: 66px;
    font: {
      size: 48px;
      weight: 800;
    }
    &:first-letter {
      text-transform: capitalize;
    }
  }
  &__wrapper-cards{
    display: flex;
    flex-wrap: wrap;
    column-gap: 34px;
    row-gap: 24px;
  }
}
</style>
