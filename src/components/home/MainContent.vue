<script setup>
import CarouselMain from './Carousel.vue';
import MainBottom from './MainBottom.vue';
</script>

<template>
  <section class="main-content">
    <section class="main-content__carousel">
      <CarouselMain />
    </section>
    <section class="main-content__cards">
      <MainBottom />
    </section>
  </section>
</template>

<style lang="scss">
.main-content {
  width: 100%;
  max-width: 870px;
  padding: {
    bottom: 90px;
    left: 68px;
    right: 32px;
  }

  &__carousel {
    padding-bottom: 60px;
  }
}
</style>
