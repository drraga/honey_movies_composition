<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  elementsArray: {
    type: Array,
    default: () => ([]),
  },
  title: {
    type: String,
    required: true,
  },
  visibility: {
    type: String,
    default: 'visible',
  },
})

const display = ref(false);
const displayText = computed(() => { return display.value ? 'Свернуть' : 'Показать еще' });

const displayElementList = computed(() => {
  const listLimit = 3;
  return display.value
        ? props.elementsArray
        : props.elementsArray.slice(0, listLimit);
})

const categoryPath = computed(() => {
  return props.title !== 'Menu'
        ? props.title.toLowerCase()
        : 'top'
})
</script>

<template>
  <section class="left-side-bar-item">
    <span class="left-side-bar-item__header">
      {{ title }}
    </span>

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

    <div
      class="left-side-bar-item__expand-button"
      :style="{ visibility }"
      @click="display = !display"
      @keydown="bar"
    >
      {{ displayText }}
    </div>
  </section>
</template>

<style lang="scss">
$primary-color: #f9f9f9;
$secondary-color: #f8b319;

.left-side-bar-item {
  padding-bottom: 60px;
  &__header {
    display: inline-block;
    font-weight: 700;
    margin-bottom: 24px;
    color: #F9F9F9AB;
  }
  &__scroll {
    max-height: 214px;
    overflow: auto;
  }

  &__nav-link {
    text-decoration: none;
    text-transform: capitalize;
    display: flex;
    height: 42px;
    color: $primary-color;
    transition: all 3ms;
    align-items: center;

    &:hover {
      border-right-style: solid;
      border-right-color: $secondary-color;
      border-right-width: 2px;
      color: $secondary-color;
    }
  }
  &__expand-button {
    cursor: pointer;
  }
}
</style>
