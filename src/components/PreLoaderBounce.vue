<template>
  <div class="loader-bounce"></div>
</template>

<style lang="scss">
@import '@/assets/styles/variables';

.loader-bounce {
  position: relative;
  inline-size: 7.5rem;
  block-size: 5.625rem;
  margin: 0 auto;
  transform: translate3d(0, 0, 0);

  &::before {
    content: '';
    position: absolute;
    bottom: 1.875rem;
    left: 3.125rem;
    inline-size: 1.875rem;
    block-size: 1.875rem;
    border-radius: 50%;
    background: $primary-color-yellow;
    animation: loading-bounce 0.5s ease-in-out infinite alternate;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    inline-size: 2.813rem;
    block-size: 0.438rem;
    border-radius: 0.25rem;
    box-shadow:
      0 5px 0 $primary-color-white,
      -2.188rem 3.125rem 0 $primary-color-white,
      -4.375rem 5.938rem 0 $primary-color-white;
    animation: loading-step 1s ease-in-out infinite;
  }
}

@keyframes loading-bounce {
  0% {
    transform: scale(1, 0.7);
  }

  40% {
    transform: scale(0.8, 1.2);
  }

  60% {
    transform: scale(1, 1);
  }

  100% {
    bottom: 8.75rem;
  }
}

@keyframes loading-step {
  0% {
    box-shadow:
      0 0.625rem 0 rgba(0, 0, 0, 0%),
      0 0.625rem 0 $primary-color-white,
      -2.188rem 3.125rem 0 $primary-color-white,
      -4.375rem 5.625rem 0 $primary-color-white;
  }

  100% {
    box-shadow:
      0 0.625rem 0 $primary-color-white,
      -2.188rem 3.125rem 0 $primary-color-white,
      -4.375rem 5.625rem 0 $primary-color-white,
      -4.375rem 5.625rem 0 rgba(0, 0, 0, 0%);
  }
}
</style>
