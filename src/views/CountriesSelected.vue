<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import BackHomeBlock from '../components/BackHomeBlock.vue'
import MoviesCardList from '../components/movies/MoviesCardList.vue'
import PreLoader from '../components/PreLoader.vue'

export default {
  name: 'CountriesSelected',
  components: {
    BackHomeBlock,
    MoviesCardList,
    PreLoader,
  },
  computed: {
    ...mapGetters('movies_catalog', {
      movies: 'getCountriesSelected',
      isLoading: 'isLoading'
    }),
    ...mapGetters('main_page', {
      countryRequestedName: 'getCountriesSelectedName',
    }),
    queryCountryId() {
      return +this.$route.params.id
    }
  },
  mounted() {
    this.fetchCountries(this.queryCountryId);
    this.fetchFilters();
  },
  beforeUnmount() {
    this.resetCurrentPageState();
    this.resetMainPageState();
  },
  methods: {
    ...mapActions('movies_catalog', {
      fetchCountries: 'fetchCountries'
    }),
    ...mapActions('main_page', {
      fetchFilters: 'fetchFilters'
    }),
    ...mapMutations('main_page', {
      resetMainPageState: 'RESET_STATE',
    }),
    ...mapMutations('movies_page', {
      resetCurrentPageState: 'RESET_STATE',
    })
  }
}
</script>

<template>
  <main
    v-if="isLoading"
    class="loader"
  >
    <PreLoader />
  </main>

  <main
    v-else
    class="country-search__wrapper"
  >
    <nav class="country-search__navigation">
      <BackHomeBlock />
    </nav>
    <span
      class="country-search__header"
    >
      {{ `Made in : ${countryRequestedName(queryCountryId)}` }}
    </span>
    <section class="country-search__wrapper-cards">
      <MoviesCardList :movies="movies" />
    </section>
  </main>
</template>

<style lang="scss">
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

.country-search{
  &__wrapper{
  color: #000000;
  padding-top: 68px;
  padding-left: 58px;
  width: 1440px;
  min-height: 1024px;
    margin: {
      left: auto;
      right: auto;
    }
  }

  &__navigation{
    padding-bottom: 54px;
  }

  &__header{
    display: block;
    color: #F9F9F9;
    padding-bottom: 66px;
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
