<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

import { storeToRefs } from 'pinia';
import { useMoviesCatalog } from '@/store/movies_catalog';
import { useMainPage } from '@/store/main_page';

import NavHome from '@/components/home/NavHome.vue';
import LeftSideBar from '@/components/home/LeftSideBar.vue';
import MainContent from '@/components/home/MainContent.vue';
import RightSideBar from '@/components/home/RightSidebar.vue';
import PreLoader from '@/components/PreLoader.vue';

const moviesCatalog = useMoviesCatalog();
const mainPage = useMainPage();

const { isLoading } = storeToRefs(moviesCatalog);
const { setLoading: setLoading, resetState: resetCurrentPageState } = moviesCatalog;

const { fetchTop, fetchPremiers, fetchFilters, resetState: resetMainPageState } = mainPage;

const monthArray = ref([
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
]);

const currentMonth = computed(() => monthArray.value[new Date().getMonth()]);

function getPromiseAll() {
  setLoading(true);
  Promise.all([fetchTop(), fetchPremiers(currentMonth.value), fetchFilters()]).then(() => {
    setLoading(false);
  });
}
onMounted(() => setLoading(true), getPromiseAll());

onBeforeUnmount(() => resetMainPageState(), resetCurrentPageState());
</script>

<template>
  <template v-if="isLoading">
    <div class="loader">
      <PreLoader />
    </div>
  </template>

  <div v-else class="home-page">
    <NavHome />

    <!-- <main class="home-page__content">
      <aside class="home-page__content--menu">
        <LeftSideBar />
      </aside>

      <MainContent />

      <RightSideBar />
    </main> -->
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/_mixins';

.home-page {
  padding: clamp(24px, (64 * 100 / 1440) * 1vw, 64px) 0 clamp(24px, (64 * 100 / 1440) * 1vw, 64px)
    clamp(20px, (50 * 100 / 1440) * 1vw, 40px);
  margin: 0 auto;

  &__content {
    display: grid;
    grid-template-columns: [left] 1fr [center] 3fr [right]1fr;

    @include mq(767) {
      grid-template-columns: 2fr 1fr;
    }

    @include mq(565) {
      display: unset;
    }

    &--menu {
      @include mq(767) {
        display: none;
      }
    }
  }
}
</style>
