<script setup>
import { ref } from 'vue';

import { storeToRefs } from 'pinia';
import { useMainPage } from '@/store/main_page';

import LeftSideBarBlock from '@/components/home/LeftSideBarBlock.vue';

const mainPage = useMainPage();

const { genres, countries } = storeToRefs(mainPage);

const mainMenu = ref([
  { id: '', label: 'Home' },
  { id: '250', label: 'Top 250' },
  { id: '100', label: 'Top 100' },
  { id: 'await', label: 'Top Await' },
]);
</script>

<template>
  <LeftSideBarBlock :title="'Menu'" :elements-array="mainMenu" :visibility="false" />
  <LeftSideBarBlock :title="'Genres'" :elements-array="genres" />
  <LeftSideBarBlock :title="'Countries'" :elements-array="countries" />
</template>
