<script setup>
import CarouselMain from '@/components/home/Carousel.vue';
import MainBottom from '@/components/home/MainBottom.vue';
</script>

<template>
  <div class="main-content">
    <div class="main-content__carousel">
      <CarouselMain />
    </div>

    <MainBottom />
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/_mixins';

.main-content {
  padding: 0 clamp(1.875rem, 0.75rem + 3.889vi, 4.25rem) 0 clamp(0.625rem, 0.75rem + 1.25vi, 1.875rem);

  &__carousel {
    margin: 0 0 clamp(1.875rem, 0.75rem + 3.333vi, 3.75rem);
  }

  @include mq(767) {
    padding: 0 clamp(1.25rem, 0.75rem + 1.9444vi, 2.5rem) 0 0;
  }

  @include mq(565) {
    padding: 0;
  }
}
</style>
