<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import LeftSideBarBlock from './LeftSideBarBlock.vue';

const store = useStore();

const genres = computed(() => store.getters['main_page/getGenres']);
const countries  = computed(() => store.getters['main_page/getCountries']);

const mainMenu = ref([
  { id: '', label: 'Home' },
  { id: '250', label: 'Top 250' },
  { id: '100', label: 'Top 100' },
  { id: 'await', label: 'Top Await' },
]);
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
  max-width: 240px;
  width: 100%;
  height: 858px;
    font: {
      size: 18px;
      weight: 600;
    }
}
</style>
