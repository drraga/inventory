<template>
  <div class="decription">
    <p></p>
    <i>
      <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 1.05L10.95 0L6 4.95L1.05 0L0 1.05L4.95 6L0 10.95L1.05 12L6 7.05L10.95 12L12 10.95L7.05 6L12 1.05Z" />
      </svg>
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
    padding: 6px;
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        svg {
          transform: rotate(90deg);
        }
      }
    }

    @media (hover: none) {
      &:active {
        svg {
          transform: rotate(90deg);
        }
      }
    }

    svg {
      width: 12px;
      height: 12px;
      fill: none;
      transition: transform 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86);

      path {
        fill: #fff;
      }
    }
  }
}
</style>
