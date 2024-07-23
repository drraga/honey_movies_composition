<script setup>
import IconSearch from '@/assets/icons/IconSearch.vue';
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
  <div class="search-field">
    <label for="search-field-input">
      <IconSearch />

      <input
        id="search-field-input"
        v-model="searchInput"
        type="text"
        placeholder="Search"
        @keyup.enter="fetchSearch(searchInput)"
      />
    </label>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.search-field {
  &:focus-within {
    svg {
      path {
        stroke: $primary-color-yellow;
      }
    }

    input {
      border: 1px solid $primary-color-yellow;
    }
  }

  label {
    position: relative;

    & > svg {
      position: absolute;
      top: 50%;
      left: 24px;

      @include mq(767) {
        display: none;
      }
    }
  }

  input {
    max-inline-size: 32ch;
    padding: 0.89em 1.33em 0.89em 3.56em;
    font-size: clamp(0.8rem, calc(0.9rem + 0.25vw), 1.25rem);
    color: $grey-light;
    border: 1px solid $grey-medium;
    border-radius: 12px;
    background-color: $grey-dark;
    transition: border 0.25s ease;

    @include mq(767) {
      padding: 0.89em 1.33em;
    }
  }
}
</style>
