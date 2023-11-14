<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchInput = ref('');

const router = useRouter();

function fetchSearch(request) {
  router.push({
    path: `/films/search/${request.toLowerCase()}`,
  });
}
</script>

<template>
  <label for="search-field-input" />
  <input
    v-model="searchInput"
    type="text"
    id="search-field-input"
    class="search-field"
    placeholder="Search"
    @keyup.enter="fetchSearch(searchInput)"
  >
</template>

<style scoped lang="scss">
  .search-field{
    height: 56px;
    max-width: 315px;
    width: 100%;
    padding: 25px;
    background-color: #21242D;
    color: #F9F9F9AB;
    border: 1px solid #F9F9F91A;
    border-radius: 12px;
    font: {
      size: 18px;
      weight: 500;
    }
  }
</style>
