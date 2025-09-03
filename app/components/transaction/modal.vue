<template>
  <UModal v-model:open="isOpen">
    <template #header> Add Transaction </template>
    <template #body>
      <UForm :state="stateForm">
        <UFormField label="Transaction Type" name="type" required="true">
          <USelect :items="types" v-model="stateForm.type"></USelect>
        </UFormField>
        <UFormField label="Amount" required="true" name="amount">
          <UInput type="number" placeholder="Amount" v-model.number="stateForm.amount"/>
        </UFormField>
        <UFormField label="Transaction date" name="created_at" required="true">
          <UInput
            v-model="stateForm.created_at"
            type="date"
            icon="i-heroicons-calendar-days-20-solid"
          ></UInput>
        </UFormField>
        <UFormField label="Description" hint="Optional" name="description">
          <UTextarea v-model.trim="stateForm.description"></UTextarea>
        </UFormField>
        <UFormField label="Category" required name="category">
          <USelect :items="categories" v-model="stateForm.category"></USelect>
        </UFormField>
        <button @click="save()" class="bg-white p-2 w-full text-black rounded-sm cursor-pointer hover:bg-gray-200 transition-all duration-100">Save</button>
      </UForm>
    </template>
  </UModal>
</template>

<script setup>
import {
  TRANSACTIONS_TYPES,
  TRANSACTIONS_CATEGORIES,
} from "../../../contants.ts";
const isOpen = defineModel();
const types = TRANSACTIONS_TYPES;
const categories = TRANSACTIONS_CATEGORIES;


const stateForm = reactive({
    type: types[0],
    amount: 0, 
    category : categories[0],
    created_at : undefined,
    description : "",

})
function save() {
  console.log("Saved");
}
</script>

<style scoped>
form > * {
  margin-bottom: 2rem;
}
form > * > * > * {
  width: 100%;
}
.styleBtn > span {
  margin: auto;
}
</style>
