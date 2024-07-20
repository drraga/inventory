<script setup>
import { onMounted } from 'vue';

import { useInventoryStore } from './stores/inventory';
const inventoryStore = useInventoryStore();

import InventoryDetails from '@/components/InventoryDetails.vue';
import InventoryFooter from '@/components/InventoryFooter.vue';
import InventoryItems from '@/components/InventoryItems.vue';

onMounted(() => {
  inventoryStore.loadFromLocalStorage();
});
</script>

<template>
  <aside>
    <InventoryDetails />
  </aside>

  <main>
    <InventoryItems />
  </main>

  <footer>
    <InventoryFooter />
  </footer>
</template>
