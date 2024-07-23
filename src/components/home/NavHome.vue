<script setup>
import SearchField from '@/components/home/SearchField.vue';
import IconAccount from '@/assets/icons/IconAccount.vue';
</script>

<template>
  <nav class="home-navigation__wrapper">
    <div class="home-navigation__logo">
      <img src="@/assets/icons/Logo.svg" alt="Logo" />
    </div>

    <SearchField />

    <div class="home-navigation__user">
      <span class="home-navigation__account-text">User</span>

      <button type="button" class="home-navigation__account-icon" aria-label="account">
        <IconAccount />
      </button>
    </div>
  </nav>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.home-navigation {
  &__wrapper {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 0 clamp(12px, (46 * 100 / 1440) * 1vw, 46px);
  }

  &__logo {
    flex-basis: 22%;
  }

  &__user {
    display: flex;
    flex-basis: 26%;
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
    margin-right: 16px;
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

    @include mq(767) {
      display: none;
    }
  }

  &__account-icon {
    padding: 12px 14px;
    border-radius: 12px;
    background-color: rgba(249, 249, 249, 20%);
    margin-right: 36px;
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
}
</style>
