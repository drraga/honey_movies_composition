<script setup>
const props = defineProps({
  isRight: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="btn-control">
    <svg :class="{ right: isRight }" viewBox="-128 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
      />
    </svg>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/variables';

.btn-control {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: clamp(0.375rem, 0.375rem + 0.486vi, 0.813rem);
  border-radius: clamp(0.625rem, 0.25rem + 0.764vi, 0.938rem);
  background-color: $primary-background-color;
  transition:
    transform 0.15s ease,
    background 0.25s ease;

  & svg {
    width: clamp(1.125rem, 0.375rem + 1.319vi, 1.563rem);
    fill: #fff;
    transform: translate3d(0, 0, 0);
    transition:
      transform 0.25s ease,
      fill 0.25s ease;

    &.right {
      transform: rotate(180deg);
    }

    & path {
      stroke: $primary-color-white;
    }
  }

  @media (hover: hover) {
    &:hover {
      svg {
        fill: $primary-color-yellow;
        transform: scale(1.1) translate3d(0, 0, 0);
      }

      svg.right {
        transform: scale(1.1) translate3d(0, 0, 0) rotate(180deg);
      }

      &:active {
        svg {
          fill: $primary-color-yellow;
          transform: scale(0.98) translate3d(0, 0, 0);
        }

        &.next {
          svg {
            transform: scale(0.98) translate3d(0, 0, 0) rotate(180deg);
          }
        }
      }
    }
  }

  @media (hover: none) {
    &:active {
      background: $primary-color-yellow;
      transform: scale(0.95);
    }
  }
}
</style>
