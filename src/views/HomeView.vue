<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

import { storeToRefs } from 'pinia';
import { useMoviesCatalog } from '@/store/movies_catalog';
import { useMainPage } from '@/store/main_page';

import NavHome from '@/components/home/NavHome.vue';
import LeftSideBar from '@/components/home/LeftSideBar.vue';
import LeftSideBarBlock from '@/components/home/LeftSideBarBlock.vue';
import MainContent from '@/components/home/MainContent.vue';
import RightSideBar from '@/components/home/RightSidebar.vue';
import PreLoaderBounce from '@/components/PreLoaderBounce.vue';

import debounce from '@/utils/VueDebounce.js';

const moviesCatalog = useMoviesCatalog();
const mainPage = useMainPage();

const { isLoading } = storeToRefs(moviesCatalog);
const { setLoading: setLoading, resetState: resetCurrentPageState } = moviesCatalog;

const { fetchTop, fetchPremiers, fetchFilters, resetState: resetMainPageState, hideModal } = mainPage;
const { getModalState } = storeToRefs(mainPage);

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

const mainMenu = ref([
  { id: '', label: 'Home' },
  { id: '250', label: 'Top 250' },
  { id: '100', label: 'Top 100' },
  { id: 'await', label: 'Top Await' },
]);

const disableModal = () => {
  console.log(window.innerWidth);
  if (window.innerWidth > 768) {
    hideModal();
  }
};

const debounnceDisableModal = debounce(() => disableModal(), 1000);

onMounted(() => setLoading(true), getPromiseAll(), window.addEventListener('resize', debounnceDisableModal));

onBeforeUnmount(() => resetMainPageState(), resetCurrentPageState());
</script>

<template>
  <template v-if="isLoading">
    <div class="loader">
      <PreLoaderBounce />
    </div>
  </template>

  <div v-else class="home-page">
    <NavHome />
    <main class="home-page__content">
      <Transition name="slide-fade">
        <div v-if="getModalState" class="home-page__content--modal">
          <LeftSideBarBlock :title="'Menu'" :elements-array="mainMenu" :visibility="false" />
        </div>
      </Transition>

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
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.home-page {
  padding: clamp(1.5rem, 0.75rem + 3.6111vi, 4rem) clamp(1.25rem, 0.75rem + 1.9444vi, 2.5rem);
  margin: 0 auto;

  &__content {
    position: relative;
    display: grid;
    grid-template: 'navigation main main main multi-carousels' auto / calc(0.65rem + 15.56vi) 1fr 1fr 1fr 1fr;

    @include mq(767) {
      grid-template: 'main main multi-carousels' / 1fr 1fr 1fr;
    }

    @include mq(565) {
      display: unset;
    }

    &--modal {
      position: absolute;
      z-index: 2;
      padding: clamp(1.25rem, 0.75rem + 1.9444vi, 2.5rem);
      border-radius: 0.5rem;
      background-color: #000;

      & h3 {
        display: none;
      }
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

    & .slide-fade-enter-active,
    .slide-fade-leave-active {
      transition: all 0.3s ease-out;
    }

    & .slide-fade-enter-from,
    .slide-fade-leave-to {
      opacity: 0;
      transform: translateY(-1.25rem);
    }
  }
}
</style>
