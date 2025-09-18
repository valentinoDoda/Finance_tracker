<template>
  <UModal v-model:open="isOpen">
    <template #header> {{ isEditing ? "Edit" : "Add" }} Transaction </template>
    <template #body>
      <UForm
        :state="stateForm"
        :schema="schema"
        ref="form"
        @submit.prevent="save"
      >
        <UFormField label="Transaction Type" name="type" required="true">
          <USelect
            :items="types"
            :disabled="isEditing"
            v-model="stateForm.type"
          ></USelect>
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
          >
          </UInput>
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
        <UButton type="submit" color="neutral" variant="solid" label="Save" />
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
const props = defineProps({
  transaction: {
    type: Object,
    required: false,
  },
});
const isEditing = computed(() => !!props.transaction);
const emit = defineEmits(["saved"]);
watch(isOpen, (n) => {
  if (!n) {
    resetForm();
  }
});

const initializeForm = isEditing.value
  ? {
      type: props.transaction.type,
      amount: props.transaction.amount,
      created_at: props.transaction.created_at,
      description: props.transaction.description,
      category: props.transaction.category,
    }
  : {
      type: undefined,
      amount: 0,
      category: undefined,
      created_at: undefined,
      description: undefined,
    };
const stateForm = reactive({...initializeForm});

const resetForm = () => {
  Object.assign(stateForm, initializeForm);
};

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


const schema = z.intersection(
  z.discriminatedUnion("type", [
    incomeSchema,
    expenseSchema,
   
  ]),
  defaultSchema
);

const form = ref();
const isLoading = ref(false);
const supabase = useSupabaseClient();
const toast = useToast();
const save = async () => {
  try {
    const { error } = await supabase
      .from("transactions")
      .upsert({ ...stateForm, id: props.transaction?.id });

    if (!error) {
      toast.add({
        title: "Transaction saved",
        icon: "i-heroicons-check-circle",
      });
      isOpen.value = false;
      emit("saved");
      return;
    }

    throw error;
  } catch (e) {
    toast.add({
      title: "Transaction not saved",
      description: e.message,
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
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
