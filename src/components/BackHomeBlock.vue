<template>
  <div class="page-navigation">
    <router-link to="/">
      <div class="page-navigation__btn-control">
        <svg viewBox="-128 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
          />
        </svg>
      </div>
    </router-link>
    <router-link to="/" class="page-navigation__text"> Back home </router-link>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.page-navigation {
  display: flex;
  gap: clamp(12px, 1.4vw, 21px);
  padding-bottom: clamp(24px, 3.75vw, 54px);
  color: #fff;

  &__btn-control {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: clamp(11px, 0.9vw, 13px);
    border-radius: clamp(12px, 1.04vw, 15px);
    background-color: $primary-background-color;
    transition:
      transform 0.25s ease,
      background 0.25s ease;

    @media (hover: hover) {
      &:hover {
        background: $primary-color-yellow;
        transform: scale(1.05);
      }
    }

    @media (hover: none) {
      &:active {
        background: $primary-color-yellow;
        transform: scale(0.95);
      }
    }

    svg {
      width: clamp(18px, 1.74vw, 25px);
      fill: #fff;
      transition:
        transform 0.25s ease,
        fill 0.25s ease;
    }
  }

  &__text {
    align-self: center;
    color: #fff;
    font: {
      size: clamp(22px, 1.89vw, 28px);
      weight: 800;
    }
    transition: color 0.25s ease;

    @media (hover: hover) {
      &:hover {
        color: $primary-color-yellow;
      }
    }

    @media (hover: none) {
      &:active {
        color: $primary-color-yellow;
      }
    }
  }
}
</style>
