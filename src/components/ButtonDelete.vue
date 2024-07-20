<script setup>
const props = defineProps({
  isWhite: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="button-bulky" :class="{ white: props.isWhite }">
    <p>
      <slot />
    </p>
  </div>
</template>

<style lang="scss">
@import '@/assets/variables';

.button-bulky {
  user-select: none;
  padding: 11px;
  border-radius: 8px;
  background-color: $button-color;
  text-align: center;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
  transition: transform 0.25s $easeInOutCirc;
  cursor: url('/src/assets/pointers/pointerArrow.svg'), pointer;

  &.white {
    background-color: #fff;

    p {
      color: $button-text-color;
    }
  }

  @media (hover: hover) {
    &:hover {
      transform: scale(1.02) translate3d(0, 0, 0);
    }
  }

  &:active {
    transform: scale(0.98);

    > p {
      transform: scale(0.98);
    }
  }

  @media (max-width: 539px) {
    padding: 6px;
    border-radius: 6px;
  }

  > p {
    user-select: none;
    font-size: 14px;
    font-size: clamp(9px, calc((14 * 100 / 849) * 1vw), 18px);
    transform: translate3d(0, 0, 0);
    transition: transform 0.2s $easeInOutCirc;
  }
}
</style>
