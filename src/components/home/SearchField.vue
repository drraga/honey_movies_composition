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
    id="search-field-input"
    v-model="searchInput"
    type="text"
    class="search-field"
    placeholder="Search"
    @keyup.enter="fetchSearch(searchInput)"
  />
</template>

<style scoped lang="scss">
.search-field {
  height: 56px;
  max-width: 315px;
  width: 100%;
  padding: 25px;
  background-color: #21242d;
  color: #f9f9f9ab;
  border: 1px solid #f9f9f91a;
  border-radius: 12px;
  font: {
    size: 18px;
    weight: 500;
  }
}
</style>
