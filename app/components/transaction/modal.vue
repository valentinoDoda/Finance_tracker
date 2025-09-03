<template>
  <UModal v-model:open="isOpen">
    <template #header> Add Transaction </template>
    <template #body>
      <UForm
        :state="stateForm"
        :schema="schema"
        ref="form"
        @submit.prevent="save"
      >
        <UFormField label="Transaction Type" name="type" required="true">
          <USelect :items="types" v-model="stateForm.type"></USelect>
        </UFormField>
        <UFormField label="Amount" required="true" name="amount">
          <UInput
            type="number"
            placeholder="Amount"
            v-model.number="stateForm.amount"
          />
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
        <UFormField
          label="Category"
          required
          name="category"
          v-if="stateForm.type === 'Expense'"
        >
          <USelect :items="categories" v-model="stateForm.category"></USelect>
        </UFormField>
        <button
          @click="save"
          class="bg-white p-2 w-full text-black rounded-sm cursor-pointer hover:bg-gray-200 transition-all duration-100"
        >
          Save
        </button>
      </UForm>
    </template>
  </UModal>
</template>

<script setup>
import { z } from "zod";
import {
  TRANSACTIONS_TYPES,
  TRANSACTIONS_CATEGORIES,
} from "../../../contants.ts";
const isOpen = defineModel();
const types = TRANSACTIONS_TYPES;
const categories = TRANSACTIONS_CATEGORIES;

watch(isOpen, (n) => {
  if (!n) {
    resetForm()
  }
});

const initializeForm = {
  type: undefined,
  amount: 0,
  category: undefined,
  created_at: undefined,
  description: undefined
};
const stateForm = reactive({
  ...initializeForm
});

const resetForm = ()=> {
    Object.assign(stateForm, initializeForm)
}

const defaultSchema = z.object({
  created_at: z.string(),
  description: z.string().optional(),
  amount: z.number().positive("Amount needs to be more than 0"),
});

const incomeSchema = z.object({
  type: z.literal("Income"),
});
const expenseSchema = z.object({
  type: z.literal("Expense"),
  category: z.enum(categories),
});
const investmentSchema = z.object({
  type: z.literal("Investment"),
});
const savingSchema = z.object({
  type: z.literal("Saving"),
});

const schema = z.intersection(
  z.discriminatedUnion("type", [
    incomeSchema,
    expenseSchema,
    investmentSchema,
    savingSchema,
  ]),
  defaultSchema
);

const form = ref();

const save = async () => {
  form.value.validate();
};
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
