<script setup>
import HTMLIconSearch from '@/assets/icons/HTMLIconSearch.vue';
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
      <HTMLIconSearch />

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

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.search-field {
  font-size: clamp(0.8rem, 0.9rem + 0.25vi, 1.25rem);

  &:focus-within {
    svg {
      path {
        stroke: $primary-color-yellow;
      }
    }

    input {
      outline: 0.06rem solid $primary-color-yellow;
    }
  }

  label {
    position: relative;

    & > svg {
      position: absolute;
      top: 50%;
      left: 1.33em;

      @include mq(457) {
        display: none;
      }
    }
  }

  input {
    width: 100%;
    padding: 0.89em 1.33em 0.89em 3.56em;
    font-size: clamp(0.8rem, calc(0.9rem + 0.25vi), 1.25rem);
    color: $grey-light;
    border: 1px solid $grey-medium;
    border-radius: 0.75rem;
    background-color: $grey-dark;
    transition: border 0.25s ease;

    @include mq(457) {
      padding: 0.89em 1.33em;
    }
  }
}
</style>
