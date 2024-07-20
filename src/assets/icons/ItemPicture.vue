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
  <svg viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="6" width="48" height="48" :fill="props.colorPrimary" />
    <g filter="url(#filter0_b_0_17)">
      <rect x="6" width="48" height="48" :fill="props.colorSecondary" fill-opacity="0.35" />
    </g>
    <defs>
      <filter
        id="filter0_b_0_17"
        x="-6"
        y="-12"
        width="72"
        height="72"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="6" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_17" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_0_17"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
</template>
