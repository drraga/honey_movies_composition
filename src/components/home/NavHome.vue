<script setup>
import SearchField from '@/components/home/SearchField.vue';
import IconAccount from '@/assets/icons/IconAccount.vue';
import IconBurger from '@/assets/icons/IconBurger.vue';
</script>

<template>
  <nav class="home-navigation__wrapper">
    <div class="home-navigation__logo">
      <img src="@/assets/icons/Logo.svg" alt="Logo" />
    </div>

    <div class="home-navigation__search">
      <SearchField />
    </div>

    <div class="home-navigation__user">
      <span class="home-navigation__account-text">User</span>

      <button type="button" class="home-navigation__account-icon" aria-label="account">
        <IconAccount />
      </button>
    </div>

    <div class="home-navigation__burger">
      <IconBurger />
    </div>
  </nav>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.home-navigation {
  &__wrapper {
    display: grid;
    grid-template-areas: 'logo search user-icon';
    grid-template-columns: 1fr 3fr 1.26fr;
    gap: 0.5rem;
    align-items: center;
    padding: 0 1.13rem clamp(0.75rem, 0.75rem + 2.3611vi, 2.875rem) 0;

    @include mq(767) {
      grid-template-areas:
        'logo logo user-icon user-icon'
        'burger burger search search';
      grid-template-columns: repeat(4, 1fr);
    }

    @include mq(457) {
      grid-template-areas:
        'logo logo user-icon user-icon'
        'burger search search search';
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__logo {
    grid-area: logo;
    display: grid;
    align-content: center;

    & img {
      max-inline-size: 100%;
      block-size: auto;
      aspect-ratio: 176 / 74;
      object-fit: cover;
    }
  }

  &__search {
    grid-area: search;
    justify-self: center;

    @include mq(767) {
      justify-self: stretch;
    }
  }

  &__user {
    grid-area: user-icon;
    display: flex;
    justify-content: flex-end;
  }

  &__account-text {
    display: flex;
    align-items: center;
    font-weight: 800;
    color: $primary-color-white;
    border: none;
    background: none;
    transform: translate3d(0, 0, 0);
    transition:
      transform 0.35s ease,
      color 0.35s ease;
    margin-inline-end: 1rem;
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        color: $primary-color-yellow;
        transform: scale(1.05);
      }
    }

    @media (hover: none) {
      &:active {
        color: $primary-color-yellow;
        transform: scale(0.9);
      }
    }
  }

  &__account-icon {
    padding: 0.75rem 0.875rem;
    border-radius: 0.75rem;
    background-color: $primary-background-color;
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        svg {
          transform: scale(1.05);

          path {
            stroke: $primary-color-yellow;
          }
        }
      }
    }

    @media (hover: none) {
      &:active {
        svg {
          transform: scale(0.9);

          path {
            stroke: $primary-color-yellow;
          }
        }
      }
    }
  }

  &__burger {
    grid-area: burger;
    display: grid;
    justify-content: center;
    justify-self: start;
    align-items: center;
    padding: 0.375rem;

    @include mq(768, 9999) {
      display: none;
    }
  }
}
</style>
