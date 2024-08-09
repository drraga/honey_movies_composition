<script setup>
const props = defineProps({
  isOpened: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <label class="toggle-burger" :class="{ opened: isOpened }" for="checkbox">
    <div class="bars bar1"></div>
    <div class="bars bar2"></div>
    <div class="bars bar3"></div>
  </label>
</template>

<style lang="scss">
@import '@/assets/styles/variables';

.toggle-burger {
  display: flex;
  gap: 0.625rem;
  flex-direction: column;
  inline-size: 2.5rem;
  justify-content: center;
  align-items: center;
  transition-duration: 0.3s;
  cursor: pointer;
}

.bars {
  inline-size: 100%;
  block-size: 0.25rem;
  border-radius: 0.313rem;
  background-color: $primary-color-white;
  transition-duration: 0.3s;
}

.opened.toggle-burger .bar2 {
  transform: translateY(0.875rem) rotate(60deg);
  transform-origin: right;
  margin-left: 0;
}

.opened.toggle-burger .bar1 {
  transform: translateY(1.75rem) rotate(-60deg);
  transform-origin: left;
}

.opened.toggle-burger {
  transform: rotate(-90deg);
}
</style>
