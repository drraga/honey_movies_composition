<template>
  <svg class="icon-burger" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_429_11066)">
      <path d="M3 6.00092H21M3 12.0009H21M3 18.0009H21" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_429_11066">
        <rect width="24" height="24" fill="white" transform="translate(0 0.000915527)" />
      </clipPath>
    </defs>
  </svg>
</template>

<style lang="scss">
@import '@/assets/styles/variables';
.icon-burger {
  width: 1.5rem;
  height: 1.5rem;
  fill: none;

  & path {
    stroke: $primary-color-white;
    stroke-width: 2.5;
  }
}
</style>
