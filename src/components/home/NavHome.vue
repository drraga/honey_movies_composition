<script setup>
import SearchField from './SearchField.vue';
</script>

<template>
  <nav class="home-navigation__wrapper">
    <div class="home-navigation__logo">
      <img src="@/assets/icons/Logo.svg" alt="Logo" />
    </div>

    <SearchField />

    <div class="home-navigation__user">
      <span class="home-navigation__account-text">User</span>

      <button type="button" class="home-navigation__account-icon">
        <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.40002 19.5124C1.40002 15.7369 4.55431 12.6762 11 12.6762C17.4457 12.6762 20.6 15.7369 20.6 19.5124C20.6 20.1131 20.1618 20.6 19.6212 20.6H2.37885C1.83826 20.6 1.40002 20.1131 1.40002 19.5124Z"
          />
          <path
            d="M14.6 4.99999C14.6 6.98822 12.9882 8.59999 11 8.59999C9.0118 8.59999 7.40002 6.98822 7.40002 4.99999C7.40002 3.01177 9.0118 1.39999 11 1.39999C12.9882 1.39999 14.6 3.01177 14.6 4.99999Z"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

$text-color: #f9f9f9;

.home-navigation {
  &__wrapper {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: clamp(24px, (64 * 100 / 1440) * 1vw, 64px) 0 clamp(12px, (46 * 100 / 1440) * 1vw, 46px) 0;
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
    color: $text-color;
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

    svg {
      width: 24px;
      height: 24px;
      fill: none;
      transition: transform 0.35s ease;

      path {
        stroke: #fff;
        stroke-width: 2;
        transition: stroke 0.35s ease;
      }
    }
  }
}
</style>
