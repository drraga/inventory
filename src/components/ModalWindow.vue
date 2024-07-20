<script setup>
import { ref } from 'vue';
import ItemPictureModal from '@/assets/icons/ItemPictureModal.vue';
import ButtonClose from '@/components/ButtonClose.vue';
import ButtonDelete from '@/components/ButtonDelete.vue';
import AmountAdjustment from '@/components/AmountAdjustment.vue';

import { useInventoryStore } from '@/stores/inventory';

const inventoryStore = useInventoryStore();
const { deleteItem } = inventoryStore;

const props = defineProps({
  isOpened: {
    type: Boolean,
    default: false,
  },
  selectedItem: {
    type: [Object, null],
    required: true,
  },
});

const emit = defineEmits({
  close: null,
});

const isDeleteAmountOpened = ref(false);

const deleteAmountFromItem = (e) => {
  deleteItem(props.selectedItem.id, e);
};

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <Transition name="modal">
    <div v-if="props.isOpened" class="modal-mask">
      <div class="modal-mask__wrapper">
        <div class="modal-mask__header">
          <ItemPictureModal
            :color-primary="props.selectedItem.colorPrimary"
            :color-secondary="props.selectedItem.colorSecondary"
          />

          <i class="modal-mask__header--close">
            <ButtonClose @click="closeModal()" />
          </i>
        </div>

        <div class="modal-mask__details">
          <div class="modal-mask__details--text">
            <h3 />

            <p v-for="n in 5" :key="n" />
          </div>

          <div class="modal-mask__details--delete">
            <Transition name="modal">
              <ButtonDelete v-if="!isDeleteAmountOpened" @click="isDeleteAmountOpened = true">
                Удалить предмет
              </ButtonDelete>

              <AmountAdjustment
                v-else
                @close="isDeleteAmountOpened = false"
                @delete-amount="deleteAmountFromItem"
              />
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
@import '@/assets/variables';

.modal-mask {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: clamp(150px, (250 * 100 / 849) * 1vw, 500px);
  background-color: $item-background;
  height: 100%;

  &__wrapper {
    height: 100%;
    position: relative;
  }

  &__header {
    backdrop-filter: blur(10px);
    padding: calc((55 * 100 / 849) * 1vw) calc((60 * 100 / 849) * 1vw) calc((30 * 100 / 849) * 1vw);
  }

  &__header--close {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 0 6px;
  }

  &__details {
    padding: 0 15px 15px;
  }

  &__details--text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin: 0 0 18px;
    padding: 16px 4px 24px;
    border-top: 1px solid $light-grey;
    border-bottom: 1px solid $light-grey;

    @media (max-width: 539px) {
      gap: 12px;
      padding: 8px 4px 12px;
    }

    > * {
      background: $background-gradient;
      width: 100%;
    }

    > h3 {
      // margin: 0 0 24px;
      margin: 0 0 8px;
      padding: 15px;
      border-radius: 8px;

      @media (max-width: 539px) {
        margin: 0;
        padding: 10px;
        border-radius: 5px;
      }
    }

    > p {
      // margin: 0 0 16px;
      padding: 5px;
      border-radius: 4px;

      &:nth-of-type(4) {
        max-width: calc(100% - 16px);
      }

      &:last-of-type {
        max-width: calc(100% - calc((131 * 100 / 849) * 1vw));
      }

      @media (max-width: 539px) {
        &:not(:first-of-type) {
          display: none;
        }
      }
    }
  }

  &__details--delete {
    -webkit-tap-highlight-color: transparent;
  }
}

.modal-enter-active {
  transition: all 0.5s $easeInOutCubic;
}

.modal-leave-active {
  transition: all 0.5s $easeInOutCubic;
}

.modal-enter-from,
.modal-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
