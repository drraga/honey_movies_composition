<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  elementsArray: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    required: true,
  },
  visibility: {
    type: Boolean,
    default: true,
  },
});

const display = ref(false);
const displayText = computed(() => {
  return display.value ? 'Свернуть' : 'Eщё';
});

const listLimit = 3;

const displayElementList = computed(() => {
  return !props.visibility ? props.elementsArray : props.elementsArray.slice(0, listLimit);
});

const displayRemainingElements = computed(() => {
  return props.elementsArray.slice(listLimit, -1);
});

const categoryPath = computed(() => {
  return props.title !== 'Menu' ? props.title.toLowerCase() : 'top';
});
</script>

<template>
  <div class="left-side-bar-block">
    <h3>
      {{ title }}
    </h3>

    <menu class="left-side-bar-block__items">
      <li v-for="element in displayElementList" :key="element.id" class="left-side-bar-block__nav-link is-active">
        <RouterLink :to="`/films/${categoryPath}/${element.id}`">
          {{ element.label }}
        </RouterLink>
      </li>

      <li
        v-for="element in displayRemainingElements"
        :key="element.id"
        class="left-side-bar-block__nav-link"
        :class="{ 'is-active': display }"
      >
        <RouterLink :to="`/films/${categoryPath}/${element.id}`">
          {{ element.label }}
        </RouterLink>
      </li>
    </menu>

    <div v-if="visibility" class="left-side-bar-block__expand-button" @click="display = !display" @keydown="bar">
      {{ displayText }}
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.left-side-bar-block {
  font-size: clamp(0.75rem, 0.75rem + 0.417vi, 1.125rem);

  h3 {
    font-weight: 700;
    color: $grey;
    margin: 0 0 clamp(0.75rem, 0.75rem + 0.8333vi, 1.5rem);
  }

  &__items {
    max-block-size: 13.375rem;
    list-style: none;
    overflow-y: auto;
  }

  &__nav-link {
    position: relative;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 1s $easeInnOutCirc;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 0.125rem;
      background: transparent;
      transition: background 0.25s ease;
    }

    &.is-active {
      grid-template-rows: 1fr;
    }

    &.is-active > a {
      padding: 0.438rem 0;
    }

    & > a {
      display: flex;
      align-items: center;
      font-weight: 600;
      text-transform: capitalize;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: $primary-color-white;
      transform: translate3d(0, 0, 0);
      transform-origin: center left;
      transition:
        padding 1s ease,
        color 0.35s ease,
        transform 0.35s ease;
      overflow: hidden;
    }

    &:hover {
      &::after {
        background: $primary-color-yellow;
      }

      a {
        color: $primary-color-yellow;
      }
    }
  }

  &__expand-button {
    padding: 0.435rem 0;
    cursor: pointer;
  }
}
</style>
