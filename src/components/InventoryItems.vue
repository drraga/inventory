<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import { useInventoryStore } from '@/stores/inventory';

const inventoryStore = useInventoryStore();
const { getItemInCell } = storeToRefs(inventoryStore);
const { setItemPosition } = inventoryStore;

import ItemPicture from '@/assets/icons/ItemPicture.vue';
import ModalWindow from '@/components/ModalWindow.vue';

const gridCells = ref([...Array(25).keys()].map((index) => ({ id: index + 1 })));

const touchItem = ref(null);
const touchStartX = ref(0);
const touchStartY = ref(0);
const gridElement = ref(null);
const draggedElement = ref(null);

const indexOld = ref(null);
const indexCurrent = ref(null);

const onDragStart = (event, itemId, cellId) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('itemId', itemId);

  indexOld.value = cellId;
};
const handleDragend = () => {
  indexOld.value = null;
  indexCurrent.value = null;
};
const onDragOver = (currentCellId) => {
  if (currentCellId !== indexCurrent.value) {
    indexCurrent.value = currentCellId;
  }
};
const onDrop = (event, cellId) => {
  const item = event.dataTransfer.getData('itemId');

  setItemPosition(parseInt(item), cellId);

  handleDragend();
};

const onTouchStart = (event, cellId) => {
  const item = getItemInCell.value(cellId);

  if (item) {
    touchItem.value = item;
    touchStartX.value = event.touches[0].clientX;
    touchStartY.value = event.touches[0].clientY;

    isDragging.value = true;
    draggedElement.value = document.querySelector(
      `.items-grid__item[data-id="${touchItem.value.id}"]`,
    );

    if (draggedElement.value) {
      draggedElement.value.style.transition = 'none';
    }
  }
};

const onTouchMove = (event) => {
  if (!touchItem.value || !isDragging.value) return;
  event.preventDefault();
  const touch = event.touches[0];
  const moveX = touch.clientX - touchStartX.value;
  const moveY = touch.clientY - touchStartY.value;
  if (draggedElement.value) {
    draggedElement.value.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }
};

const onTouchEnd = (event) => {
  if (!touchItem.value || !isDragging.value) return;
  const touch = event.changedTouches[0];
  const endX = touch.clientX;
  const endY = touch.clientY;

  let cellId = null;
  document.querySelectorAll('.items-grid__cell').forEach((cell) => {
    const rect = cell.getBoundingClientRect();
    if (endX >= rect.left && endX <= rect.right && endY >= rect.top && endY <= rect.bottom) {
      cellId = parseInt(cell.dataset.id);
    }
  });

  if (cellId) {
    setItemPosition(touchItem.value.id, cellId);
    isDragging.value = false;
    draggedElement.value = null;
  }
};

onMounted(() => {
  gridElement.value = document.querySelector('.items-grid__wrapper');
});

onBeforeUnmount(() => {
  gridElement.value = null;
});

const isModalOpened = ref(false);
const isDragging = ref(true);
const selectedItem = ref(null);
const modalOpen = (item) => {
  selectedItem.value = item;
  isModalOpened.value = true;
};
</script>

<template>
  <div class="items-grid">
    <div class="items-grid__wrapper">
      <div
        v-for="cell in gridCells"
        :key="cell.id"
        :data-id="cell.id"
        class="items-grid__cell"
        :class="{ draggable: cell.id === indexCurrent }"
        @drop="onDrop($event, cell.id)"
        @dragover.prevent="onDragOver(cell.id)"
        @touchstart="onTouchStart($event, cell.id)"
        @touchmove="onTouchMove($event)"
        @touchend="onTouchEnd"
      >
        <div
          v-if="getItemInCell(cell.id)"
          class="items-grid__item"
          :class="{ dragging: isDragging }"
          :data-id="getItemInCell(cell.id).id"
          :draggable="true"
          @dragstart="onDragStart($event, getItemInCell(cell.id).id, cell.id)"
          @click="modalOpen(getItemInCell(cell.id))"
        >
          <div class="items-grid__item-wrapper">
            <ItemPicture
              :color-primary="getItemInCell(cell.id).colorPrimary"
              :color-secondary="getItemInCell(cell.id).colorSecondary"
            />

            <p class="items-grid__item-wrapper--amount">{{ getItemInCell(cell.id).amount }}</p>
          </div>
        </div>
      </div>

      <ModalWindow
        :is-opened="isModalOpened"
        :selected-item="selectedItem"
        @close="isModalOpened = false"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/variables';

.items-grid {
  &__wrapper {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    outline: 1px solid $light-grey;
    border-radius: 12px;
    width: 100%;
    height: 100%;
  }

  &__cell {
    position: relative;
    aspect-ratio: 1;
    border: 1px solid $light-grey;
    transition: background-color 0.25s $easeInOutCubic;

    &.draggable {
      background-color: $light-grey;
    }
  }

  &__item {
    height: 100%;
    touch-action: none;

    &:active {
      cursor: url('/src/assets/pointers/pointerHover.svg'), pointer;
    }
  }

  &__item-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: -2px;
    padding: clamp(10px, (23 * 100 / 849) * 1vw, 23px);
    -webkit-tap-highlight-color: transparent;
    transition: background-color 0.3s $easeInOutCirc;

    &:hover {
      cursor: url('/src/assets/pointers/pointerHover.svg'), pointer;
      background-color: $item-background-hover;
    }

    &:active {
      overflow: hidden;
      border: 1px solid $light-grey;
      border-radius: clamp(6px, (24 * 100 / 849) * 1vw, 24px);
      cursor: grabbing;

      > p {
        opacity: 0;
      }
    }

    > svg {
      height: 100%;
      width: 100%;
    }

    > p {
      position: absolute;
      bottom: 0;
      right: 0;
      max-width: 30%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: clamp(9px, 1.17vw, 15px);
      padding: 0 5px;
      border: 1px solid $light-grey;
      border-radius: 6px 0 0 0;
    }
  }
}
</style>
