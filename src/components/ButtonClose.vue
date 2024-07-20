<template>
  <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" class="button-close">
    <path
      d="M12 1.05L10.95 0L6 4.95L1.05 0L0 1.05L4.95 6L0 10.95L1.05 12L6 7.05L10.95 12L12 10.95L7.05 6L12 1.05Z"
    />
  </svg>
</template>

<style lang="scss">
@import '@/assets/variables';

.button-close {
  width: 12px;
  height: 12px;
  fill: none;
  transition: transform 0.25s $easeInOutCirc;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      transform: rotate(90deg);
    }
  }

  @media (hover: none) {
    &:active {
      transform: rotate(90deg);
    }
  }

  path {
    fill: #fff;
  }
}
</style>
