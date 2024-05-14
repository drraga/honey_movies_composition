<script setup>
import CarouselMain from '@/components/home/Carousel.vue';
import MainBottom from '@/components/home/MainBottom.vue';
</script>

<template>
  <section class="main-content">
    <div class="main-content__carousel">
      <CarouselMain />
    </div>

    <MainBottom />
  </section>
</template>

<style lang="scss">
// TODO padding bottom вернуть и записать адекватно, возможно перенести в другой блок
.main-content {
  padding: 0 clamp(30px, ((68 / 1440) * 100vw), 68px) 0 clamp(10px, ((30 / 1440) * 100vw), 30px);

  &__carousel {
    margin: 0 0 clamp(30px, ((60 / 1440) * 100vw), 60px);
  }
}
</style>
