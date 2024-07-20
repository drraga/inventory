<script setup>
import ButtonClose from '@/components/ButtonClose.vue';
</script>

<template>
  <div class="decription">
    <p />

    <i>
      <ButtonClose />
    </i>
  </div>
</template>

<style lang="scss">
@import '@/assets/variables';

.decription {
  position: relative;
  padding: 18px 68px 18px;
  outline: 1px solid $light-grey;
  border-radius: 12px;

  p {
    padding: 18px;
    background: $background-gradient;
    border-radius: 12px;
  }

  i {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 0 6px;
    cursor: pointer;
  }
}
</style>
