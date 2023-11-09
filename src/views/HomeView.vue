<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import NavHome from '../components/home/NavHome.vue'
import LeftSideBar from '../components/home/LeftSideBar.vue'
import MainContent from '../components/home/MainContent.vue'
import RightSideBar from '../components/home/RightSidebar.vue'
import PreLoader from '../components/PreLoader.vue'

export default {
  components: {
    NavHome,
    LeftSideBar,
    MainContent,
    RightSideBar,
    PreLoader,
  },
  data() {
    return {
      monthArray:
      ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
    }
  },
  computed: {
    ...mapGetters('movies_catalog', {
      isLoading: 'isLoading'
    }),
    currentMonth() {
      return this.monthArray[new Date().getMonth()]
    }
  },
  mounted() {
    this.setLoading(true);
    this.getPromiseAll();
  },
  beforeUnmount() {
    this.resetMainPageState();
    this.resetCurrentPageState()
  },
  methods: {
    ...mapMutations('main_page', {
      resetMainPageState: 'RESET_STATE',
    }),
    ...mapMutations('movies_catalog', {
      resetCurrentPageState: 'RESET_STATE',
      setLoading: 'SET_LOADING',
    }),
    ...mapActions('main_page', {
      fetchTop: 'fetchTop',
      fetchPremiers: 'fetchPremiers',
      fetchFilters: 'fetchFilters'
    }),
    getPromiseAll() {
      this.setLoading(true);
      Promise.all([this.fetchTop(), this.fetchPremiers(this.currentMonth), this.fetchFilters(),])
        .then(() => {
          this.setLoading(false)
        })
    }
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
    class="home-page__wrapper"
  >
    <nav>
      <NavHome />
    </nav>
    <section class="home-page__content">
      <LeftSideBar />
      <MainContent />
      <RightSideBar />
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
    min-height: 1024px;
    margin: {
      left: auto;
      right: auto;
    }
  }

.home-page {
  &__wrapper{
    max-width: 1440px;
    width: 100%;
    margin: {
      left: auto;
      right: auto;
    }
  }
  &__content{
    display: flex;
  }
}

</style>
