<template>
  <div class="inventory-details">
    <img
      src="@/assets/icons/inventoryLabel.png"
      alt="размытое изображение высоких башен на фоне земли и неба"
    />

    <div class="inventory-details__text">
      <h2 />

      <p v-for="n in 6" :key="n" />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/variables';

.inventory-details {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 18px 14px;
  outline: 1px solid $light-grey;
  border-radius: 12px;
  margin: 0 auto;

  img {
    width: 100%;
    margin: 0 0 20px;
    background: transparent;
  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 9px 6px;

    & > * {
      width: 100%;
      background: $background-gradient;
    }

    h2 {
      padding: 13px;
      margin: 0 0 24px;
      border-radius: 8px;
    }

    p {
      width: 100%;
      padding: 5px;
      margin: 0 0 16px;
      border-radius: 4px;

      &:first-of-type {
        max-width: calc(100% - 44px);
      }

      &:nth-of-type(3n) {
        max-width: calc(100% - 30px);
      }

      &:nth-of-type(4n) {
        max-width: calc(100% - 40px);
      }

      &:nth-of-type(5n) {
        width: calc(100% - 60px);
      }

      &:last-of-type {
        width: calc(100% - 120px);
        margin: 8px 0 6px;
      }
    }
  }
}
</style>
