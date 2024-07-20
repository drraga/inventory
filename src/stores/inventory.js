// import { ref, computed } from 'vue'
import { defineStore } from 'pinia';

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    items: [
      {
        id: 1,
        position: 1,
        amount: 2,
        name: 'Швабра',
        colorPrimary: '#7faa65',
        colorSecondary: '#b8d998',
      },
      {
        id: 2,
        position: 7,
        amount: 5,
        name: 'Совок',
        colorPrimary: '#aa9765',
        colorSecondary: '#d9bb98',
      },
      {
        id: 3,
        position: 15,
        amount: 1,
        name: 'Сковорода',
        colorPrimary: '#7481ed',
        colorSecondary: '#656caa',
      },
      {
        id: 4,
        position: 3,
        amount: 0,
        name: 'Игрушки',
        colorPrimary: '#7faa65',
        colorSecondary: '#b8d998',
      },
    ],
  }),
  getters: {
    getItemInCell: (state) => {
      return (cellId) => state.items.find((item) => item.position === cellId);
    },
  },
  actions: {
    setItemPosition(id, position) {
      const item = this.items.find((item) => item.id === id);

      if (item) {
        item.position = position;
        this.saveToLocalStorage((item) => item.id === id);
      }
    },
    deleteItem(id, deleteAmount) {
      const item = this.items.find((item) => item.id === id);

      if (item) {
        item.amount >= deleteAmount ? (item.amount -= +deleteAmount) : (item.amount = 0);
        this.saveToLocalStorage();
      }
    },
    setItemsAmount(id, amount) {
      const item = this.items.find((item) => item.id === id);

      if (item) {
        item.amount = amount;
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('inventory', JSON.stringify(this.items));
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('inventory');
      if (data) {
        this.items = JSON.parse(data);
      }
    },
  },
});
