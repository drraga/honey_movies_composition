<script setup>
import { ref, computed } from 'vue';

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
  return display.value ? 'Свернуть' : 'Показать еще';
});

const displayElementList = computed(() => {
  const listLimit = 3;
  return display.value ? props.elementsArray : props.elementsArray.slice(0, listLimit);
});

const categoryPath = computed(() => {
  return props.title !== 'Menu' ? props.title.toLowerCase() : 'top';
});
</script>

<template>
  <section class="left-side-bar-block">
    <h3>
      {{ title }}
    </h3>

    <div class="left-side-bar-block__items">
      <div v-for="element in displayElementList" :key="element.id" class="left-side-bar-block__nav-link">
        <RouterLink :to="`/films/${categoryPath}/${element.id}`">
          {{ element.label }}
        </RouterLink>
      </div>
    </div>

    <div v-if="visibility" class="left-side-bar-block__expand-button" @click="display = !display" @keydown="bar">
      {{ displayText }}
    </div>
  </section>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.left-side-bar-block {
  padding-bottom: clamp(20px, (40 * 100 / 1440) * 1vw, 40px);
  font-size: 18px;

  h3 {
    font-weight: 700;
    color: $grey;
    margin-bottom: clamp(12px, (24 * 100 / 1440) * 1vw, 24px);
  }

  &__items {
    max-height: 214px;
    overflow-y: auto;
  }

  &__nav-link {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 2px;
      background: transparent;
      transition: background 0.25s ease;
    }

    & > a {
      display: flex;
      align-items: center;
      max-width: calc((235 / 1440) * 100vw);
      padding: 7px 0;
      font-weight: 600;
      text-transform: capitalize;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: $primary-color-white;
      transform: translate3d(0, 0, 0);
      transform-origin: center left;
      transition:
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
    padding: 7px 0;
    cursor: pointer;
  }
}
</style>
