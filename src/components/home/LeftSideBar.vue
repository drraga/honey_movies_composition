<script>
import { mapGetters } from 'vuex'
import LeftSideBarBlock from './LeftSideBarBlock.vue';

export default {
  name: 'LeftSideBar',
  components: {
    LeftSideBarBlock,
  },
  data() {
    return {
      mainMenu: [
        { id: '', label: 'Home' },
        { id: '250', label: 'Top 250' },
        { id: '100', label: 'Top 100' },
        { id: 'await', label: 'Top Await' },
      ],
    };
  },
  computed: {
    ...mapGetters('main_page', {
      genres: 'getGenres',
      countries: 'getCountries'
    })
  }
};
</script>

<template>
  <aside class="left-side-bar">
    <LeftSideBarBlock :title="'Menu'" :elements-array="mainMenu" :visibility="`collapse`" />
    <LeftSideBarBlock :title="'Genres'" :elements-array="genres" />
    <LeftSideBarBlock :title="'Countries'" :elements-array="countries" />
  </aside>
</template>

<style lang="scss">
.left-side-bar{
  padding-left: 40px;
  width: 240px;
  height: 858px;
    font: {
      size: 18px;
      weight: 600;
    }
}
</style>
