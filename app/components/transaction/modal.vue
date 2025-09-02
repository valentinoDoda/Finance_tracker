<template>
  <UModal v-model:open="isOpen">
    
      <template #header> Add Transaction </template>
    
  </UModal>
</template>

<script setup>
const isOpen = defineModel();
</script>
