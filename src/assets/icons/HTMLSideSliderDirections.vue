<script setup>
const props = defineProps({
  isRight: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <i class="side-slider-directions">
    <svg :class="{ right: props.isRight }" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 8L10 12L14 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </i>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/_mixins';

.side-slider-directions {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate3d(0, 0, 0);
  transition: transform 0.35s ease;

  @media (hover: hover) {
    &:hover {
      transform: scale(1.2);

      svg {
        path {
          stroke: $primary-color-yellow;
        }
      }
    }

    &:active {
      transform: scale(0.8);

      svg {
        path {
          stroke: $primary-color-yellow;
        }
      }
    }
  }

  @media (hover: none) {
    &:active {
      transform: scale(0.8);

      svg {
        path {
          stroke: $primary-color-yellow;
        }
      }
    }
  }

  & svg {
    width: 1.5rem;

    &.right {
      transform: rotate(180deg);
    }

    path {
      stroke: $primary-color-white;
      transition: stroke 0.35s ease;
    }
  }
}
</style>
