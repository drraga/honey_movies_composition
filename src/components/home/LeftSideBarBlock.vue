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
    type: String,
    default: 'visible',
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
  <section class="left-side-bar-item">
    <h3>
      {{ title }}
    </h3>

    <div class="left-side-bar-item__scroll">
      <RouterLink
        v-for="element in displayElementList"
        :key="element.id"
        :to="`/films/${categoryPath}/${element.id}`"
        class="left-side-bar-item__nav-link"
      >
        {{ element.label }}
      </RouterLink>
    </div>

    <div class="left-side-bar-item__expand-button" :style="{ visibility }" @click="display = !display" @keydown="bar">
      {{ displayText }}
    </div>
  </section>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.left-side-bar-item {
  padding-bottom: clamp(20px, (60 * 100 / 1440) * 1vw, 60px);

  h3 {
    font-weight: 700;
    color: #f9f9f9ab;
    margin-bottom: clamp(12px, (24 * 100 / 1440) * 1vw, 24px);
  }

  &__scroll {
    max-height: 214px;
    overflow-y: auto;
  }

  &__nav-link {
    display: flex;
    align-items: center;
    height: 42px;
    font-weight: 600;
    text-decoration: none;
    text-transform: capitalize;
    color: $primary-color-white;
    transform: translate3d(0, 0, 0);
    transition:
      color 0.35s ease,
      transform 0.35s ease;

    // &:after {
    //   content: '';
    //   width: 2px;
    //   background: $primary-color-white;
    //   position: absolute;
    //   right: 0;
    //   top: 0;
    //   bottom: 0;
    //   // transform: translateX(200%);
    // }

    &:hover {
      color: $primary-color-yellow;
      transform: scale(1.05);
      // box-shadow: 0 -2px 0 $primary-color-yellow;
    }
  }

  &__expand-button {
    cursor: pointer;
  }
}
</style>
