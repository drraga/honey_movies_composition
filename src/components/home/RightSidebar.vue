<script setup>
import { ref, computed } from 'vue';

import { storeToRefs } from 'pinia';
import { useMainPage } from '@/store/main_page';

import RightSideBarSlider from '@/components/home/RightSideBarSlider.vue';

const listLimit = ref(5);

const mainPage = useMainPage();
const { moviesTop250, moviesTop100, moviesTopAwait } = storeToRefs(mainPage);

const moviesTop250Sliced = computed(() => moviesTop250.value.slice(0, listLimit.value));
const moviesTop100Sliced = computed(() => moviesTop100.value.slice(0, listLimit.value));
const moviesTopAwaitSliced = computed(() => moviesTopAwait.value.slice(0, listLimit.value));
</script>

<template>
  <div class="right-side-bar">
    <RightSideBarSlider :elements-array="moviesTop250Sliced" block-name="Top 250" catalog-url="/films/top/250" />
    <RightSideBarSlider :elements-array="moviesTop100Sliced" block-name="Top 100" catalog-url="/films/top/100" />
    <RightSideBarSlider :elements-array="moviesTopAwaitSliced" block-name="Top Await" catalog-url="/films/top/await" />
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/_mixins';

.right-side-bar {
  display: grid;
  grid-template-rows: [top250] auto [top100] auto [topAwait] auto;
  row-gap: clamp(30px, ((60 / 1440) * 100vw), 60px);
  margin-inline-end: clamp(-2.5rem, -0.75rem - 1.9444vi, -1.25rem);

  @include mq(565) {
    margin-inline-end: 0;
  }
}
</style>
