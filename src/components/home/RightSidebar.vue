<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import RightSideBarElement from './RightSideBarBlock.vue';

const listLimit = ref(5);

const store = useStore();

const moviesTop250 = computed(() => store.getters['main_page/getMoviesTop250']?.slice(0, listLimit.value));
const moviesTop100 = computed(() => store.getters['main_page/getMoviesTop100']?.slice(0, listLimit.value));
const moviesTopAwait = computed(() => store.getters['main_page/getMoviesTopAwait']?.slice(0, listLimit.value));
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
    width: 100%;
}
</style>
