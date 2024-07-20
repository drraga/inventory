<script setup>
const props = defineProps({
  colorPrimary: {
    type: String,
    required: true,
  },
  colorSecondary: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg" class="modal-image">
    <rect y="14.4445" width="115.556" height="115.556" :fill="props.colorPrimary" />
    <g filter="url(#filter0_b_0_234)">
      <rect
        x="14.4444"
        width="115.556"
        height="115.556"
        :fill="props.colorSecondary"
        fill-opacity="0.35"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_0_234"
        x="2.44444"
        y="-12"
        width="139.556"
        height="139.556"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="6" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_234" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_0_234"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
</template>

<style lang="scss">
.modal-image {
  fill: none;

  rect {
    transition: fill 0.25s ease;
  }
}
</style>
