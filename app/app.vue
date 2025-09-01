<script setup lang="ts">
const toaster = { duration: 2000 }
</script>

<template>
    <NuxtLayout>
      <UApp :toaster="toaster">
      <NuxtPage></NuxtPage>
      </UApp>
    </NuxtLayout>
</template>

<style src="assets/css/main.css"></style>