<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import NavHome from '../components/home/NavHome.vue';
import LeftSideBar from '../components/home/LeftSideBar.vue';
import MainContent from '../components/home/MainContent.vue';
import RightSideBar from '../components/home/RightSidebar.vue';
import PreLoader from '../components/PreLoader.vue';

const store = useStore();

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
const isLoading = computed(() => store.getters['movies_catalog/isLoading']);
const currentMonth = computed(() => monthArray.value[new Date().getMonth()]);

function setLoading(state) {
  store.commit('movies_catalog/SET_LOADING', state);
}
function fetchTop() {
  store.dispatch('main_page/fetchTop');
}
function fetchPremiers(selectedMonth) {
  store.dispatch('main_page/fetchPremiers', selectedMonth);
}
function fetchFilters() {
  store.dispatch('main_page/fetchFilters');
}
function getPromiseAll() {
  setLoading(true);
  Promise.all([fetchTop(), fetchPremiers(currentMonth.value), fetchFilters()]).then(() => {
    setLoading(false);
  });
}
onMounted(() => setLoading(true), getPromiseAll());

function resetMainPageState() {
  store.commit('main_page/RESET_STATE');
}

function resetCurrentPageState() {
  store.commit('movies_catalog/RESET_STATE');
}

onBeforeUnmount(() => resetMainPageState(), resetCurrentPageState());
</script>

<template>
  <main v-if="isLoading">
    <div class="loader">
      <PreLoader />
    </div>
  </main>

  <main v-else class="home-page__wrapper">
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
.loader {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 100vw;
  height: 100vh;
  margin: {
    left: auto;
    right: auto;
  }
}

.home-page {
  &__wrapper {
    max-width: 1440px;
    width: 100%;
    margin: {
      left: auto;
      right: auto;
    }
  }

  &__content {
    display: flex;
  }
}
</style>
