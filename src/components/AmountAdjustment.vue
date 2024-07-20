<script setup>
import { ref } from 'vue';
import ButtonDelete from '@/components/ButtonDelete.vue';

const emit = defineEmits(['close', 'deleteAmount']);

const inputValue = ref(null);
const isFormAccepted = ref(true);

const validateInput = (e) => {
  const permittedSymbols = '1234567890';

  if (!permittedSymbols.split('').includes(e.key)) {
    e.preventDefault();
  }
};

const validateAndDeleteAmount = (e) => {
  if (inputValue.value > 999 || !inputValue.value) {
    isFormAccepted.value = false;

    e.preventDefault();
    return;
  } else {
    isFormAccepted.value = true;
    emit('deleteAmount', inputValue.value);
    emit('close');
  }
};
</script>

<template>
  <div class="adjust-items">
    <div class="adjust-items__input-wrapper">
      <label name="amount">количество</label>
      <input
        v-model="inputValue"
        name="amount"
        type="text"
        inputmode="numeric"
        pattern="[\d]+"
        minlength="1"
        maxlength="999"
        placeholder="Введите количество"
        :class="{ error: !isFormAccepted }"
        @keypress="validateInput"
      />

      <Transition name="error-message">
        <p v-if="!isFormAccepted" class="adjust-items__input-wrapper--error-msg">(от 1 до 999)</p>
      </Transition>
    </div>

    <div class="adjust-items__buttons-wrapper">
      <ButtonDelete :is-white="true" @click="$emit('close')"> Отмена </ButtonDelete>

      <ButtonDelete @click="validateAndDeleteAmount"> Подтвердить </ButtonDelete>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/variables';

.adjust-items {
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background-color: $item-background;
  border-top: 1px solid $light-grey;

  &__input-wrapper {
    position: relative;

    label {
      position: absolute;
      visibility: hidden;
    }

    & input {
      margin: 0 0 20px;
      padding: 12px;
      width: 100%;
      font-size: 14px;
      color: #fff;
      border: 1px solid $light-grey;
      border-radius: 4px;
      background-color: $item-background;
      cursor: url('/src/assets/pointers/pointerArrow.svg'), pointer;

      &.error {
        border-color: $button-color;
      }
    }

    &--error-msg {
      position: absolute;
      top: -18px;
      right: 0;
      color: $button-color;
      font-size: 12px;
    }

    .error-message-enter-active {
      transition: all 0.5s $easeInOutCubic;
    }

    .error-message-leave-active {
      transition: all 0.5s $easeInOutCubic;
    }

    .error-message-enter-from,
    .error-message-leave-to {
      transform: translateX(-100%);
      opacity: 0;
    }
  }

  &__buttons-wrapper {
    display: flex;
    gap: 10px;

    & :first-child {
      flex: 2;
    }

    & :last-child {
      flex: 3;
    }

    @media (max-width: 799px) {
      flex-direction: column;
    }
  }
}
</style>
