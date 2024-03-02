<script setup>
import SearchField from './SearchField.vue';
</script>

<template>
  <div class="home-navigation__wrapper">
    <div class="home-navigation__logo">
      <img src="@/assets/icons/Logo.svg" alt="Logo" />
    </div>
    <SearchField />
    <div class="home-navigation__user">
      <span class="home-navigation__account-text"> User </span>
      <button type="button" class="home-navigation__account-icon">
        <img src="@/assets/icons/account.svg" alt="account" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
$text-color: #f9f9f9;
$hover-color: #f8b319;

.home-navigation {
  &__wrapper {
    height: 168px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__user {
    display: flex;
    cursor: pointer;
    width: 336px;
    justify-content: flex-end;
    &:hover {
      color: $hover-color;
    }
  }

  &__account-text {
    color: $text-color;
    font-weight: 800;
    background: none;
    border: none;
    margin-right: 16px;
    display: flex;
    align-items: center;
  }

  &__account-icon {
    padding: 13px 14px;
    background-color: rgba(249, 249, 249, 0.2);
    border-radius: 12px;
    margin-right: 36px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
