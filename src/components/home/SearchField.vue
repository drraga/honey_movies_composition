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
  <div class="search-field">
    <label for="search-field-input">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 11.4783C1 15.8486 1.78302 18.3581 3.30283 19.8236C4.83125 21.2975 7.35021 21.9565 11.4783 21.9565C15.6063 21.9565 18.1253 21.2975 19.6537 19.8236C21.1735 18.3581 21.9565 15.8486 21.9565 11.4783C21.9565 7.1079 21.1735 4.59842 19.6537 3.13288C18.1253 1.65904 15.6063 0.99999 11.4783 0.99999C7.35021 0.99999 4.83125 1.65904 3.30283 3.13288C1.78302 4.59842 1 7.1079 1 11.4783Z"
        />
        <path d="M22.9565 22.9565L20.3478 20.3478" />
      </svg>

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
      width: 24px;
      height: 24px;
      fill: none;
      transform: translateY(-50%);

      @include mq(767) {
        display: none;
      }

      path {
        stroke: $grey-light2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
        transition: color 0.25s ease;
      }
    }
  }

  input {
    max-width: 315px;
    padding: 16px 24px 16px 64px;
    color: $grey-light;
    border: 1px solid $grey-medium;
    border-radius: 12px;
    background-color: $grey-dark;
    transition: border 0.25s ease;
    font: {
      size: 18px;
      weight: 500;
    }

    @include mq(767) {
      padding: 16px 24px;
    }
  }
}
</style>
