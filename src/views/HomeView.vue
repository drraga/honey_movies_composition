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

    <main class="home-page__content">
      <nav class="home-page__content--navigation">
        <LeftSideBar />
      </nav>

      <section class="home-page__content--main">
        <MainContent />
      </section>

      <aside class="home-page__content--multi-carousels">
        <RightSideBar />
      </aside>
    </main>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/_mixins';

.home-page {
  padding: clamp(1.5rem, 0.75rem + 3.6111vi, 4rem) 0 clamp(1.5rem, 0.75rem + 3.6111vi, 4rem)
    clamp(1.25rem, 0.75rem + 1.9444vi, 2.5rem);
  margin: 0 auto;

  &__content {
    display: grid;
    grid-template: 'navigation main main main multi-carousels' auto / calc(0.65rem + 15.56vi) 1fr 1fr 1fr 1fr;

    @include mq(767) {
      grid-template: 'main main multi-carousels' / 1fr 1fr 1fr;
    }

    @include mq(565) {
      display: unset;
    }

    &--navigation {
      grid-area: navigation;
      display: flex;
      gap: clamp(1.25rem, 0.75rem + 1.944vi, 2.5rem);
      flex-direction: column;

      @include mq(767) {
        display: none;
      }
    }

    &--main {
      grid-area: main;
    }

    &--multi-carousels {
      grid-area: multi-carousels;
    }
  }
}
</style>
