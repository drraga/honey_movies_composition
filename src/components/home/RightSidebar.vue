<script>
import { mapGetters } from 'vuex'
import RightSideBarElement from './RightSideBarBlock.vue'

export default {
  name: 'RightSideBar',
  components: {
    RightSideBarElement
  },
  data() {
    return {
      listLimit: 5,
    }
  },
  computed: {
    ...mapGetters('main_page', {
      getMoviesTop250: 'getMoviesTop250',
      getMoviesTop100: 'getMoviesTop100',
      getMoviesTopAwait: 'getMoviesTopAwait'
    }),
    moviesTop250() {
      return this.getMoviesTop250.slice(0, this.listLimit)
    },
    moviesTop100() {
      return this.getMoviesTop100.slice(0, this.listLimit)
    },
    moviesTopAwait() {
      return this.getMoviesTopAwait.slice(0, this.listLimit)
    }
  }
}
</script>

<template>
  <div class="right-side-bar">
    <RightSideBarElement :elements-array="moviesTop250" block-name="Top 250" catalog-url="/films/top/250" />
    <RightSideBarElement :elements-array="moviesTop100" block-name="Top 100" catalog-url="/films/top/100" />
    <RightSideBarElement :elements-array="moviesTopAwait" block-name="Top Await" catalog-url="/films/top/await" />
  </div>
</template>

<style scoped>
.right-side-bar{
    max-width: 336px;
    height: 858px;
}
</style>
