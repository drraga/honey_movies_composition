<template>
  <div class="page-navigation">
    <router-link to="/">
      <div class="page-navigation__btn-control">
        <img src="@/assets/icons/previous.svg" alt="home" />
      </div>
    </router-link>
    <router-link to="/" class="page-navigation__text"> Back home </router-link>
  </div>
</template>

<style lang="scss">
@import '../assets/styles/variables.scss';

.page-navigation {
  color: $color-white;
  display: flex;
  gap: clamp(0.5rem, 1.4vw, 1.3125rem);
  &__btn-control {
    background-color: $primary-background-color;
    // border-radius: 15px;
    border-radius: 30%;
    // padding: 13px 20px;
    padding: 0.9028vw 1.389vw;
    &:hover {
      background-color: $primary-color-yellow;
    }
  }
  &__text {
    color: $color-white;
    align-self: center;
    font: {
      size: clamp(0.5rem, 1.89vw, 1.75rem);
      weight: 800;
    }
  }
}
</style>
