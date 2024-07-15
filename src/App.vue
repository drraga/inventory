<script setup>
import InventoryDetails from '@/components/InventoryDetails.vue'
import InventoryFooter from '@/components/InventoryFooter.vue'
</script>

<template>
  <aside>
    <InventoryDetails />
  </aside>

  <main>
    <div>here</div>
  </main>

  <footer>
    <InventoryFooter />
  </footer>
</template>

<style lang="scss">
footer {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
}
</style>
