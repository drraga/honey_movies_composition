<template>
  <div class="page-navigation">
    <router-link to="/">
      <div class="page-navigation__btn-control">
        <img src="@/assets/icons/previous.svg" alt="home" />
      </div>
    </router-link>
    <router-link to="/" class="page-navigation__text">
      Back home
    </router-link>
  </div>
</template>

<style lang="scss">
$primary-background-color: rgba(249, 249, 249, 0.2);

.page-navigation{
  color: #FFFFFF;
  display: flex;
  gap: 22px;
  &__btn-control{
    background-color: $primary-background-color;
    border-radius: 15px;
    padding: 13px 20px;
    &:hover{
      background-color: #F8B319;
    }
  }
  &__text{
     color: #FFFFFF;
    font: {
      size: 28px;
      weight: 800;
    }
  }
}
</style>
