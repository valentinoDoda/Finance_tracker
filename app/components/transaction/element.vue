<template>
  <div class="grid grid-cols-3 py-4 border-b">
    <div class="flex items-center justify-between space-x-4  col-span-2">
      <div class="flex items-center space-x-1">
        <UIcon :name="iconType" :class="iconTypeColor" />
        <div>{{ transaction.description }}</div>
      </div>
      <div>
        <UBadge v-if="transaction?.category" variant="outline" color="neutral">{{
          transaction?.category
        }}</UBadge>
      </div>
    </div>
    <div class="flex items-center justify-end space-x-2">
      <div>{{ currency }}</div>
      <div>
        <UDropdownMenu :items="items" class="cursor-pointer">
          <UButton
            :loading="isLoading"
            class="cursor-pointer"
            color="neutral"
            variant="ghost"
            trailing-icon="i-heroicons-ellipsis-horizontal"
          ></UButton>
          <TransactionModal v-model="isOpen" :transaction="transaction" @saved="emit('edited')" />
        </UDropdownMenu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
const supabase = useSupabaseClient();
const emit = defineEmits(["deleted", 'edited'])
const iconColors = {
  red: "text-red-400",
  green: "text-green-400",
};
const props = defineProps<{
  transaction: {
    id: string;
    amount: number;
    type: string;
    description: string;
    category?: string;
  };
}>();

const amount = computed(()=> {
  return props.transaction.amount
})
const { currency } = useCurrency(amount);


const isIncome = computed(() => {
  return props.transaction.type.toLowerCase() == "income";
});

const iconType = computed(() => {
  return isIncome.value
    ? "i-heroicons-arrow-up-right-16-solid"
    : "i-heroicons-arrow-down-left-16-solid";
});

const iconTypeColor = computed(() => {
  return isIncome.value ? iconColors.green : iconColors.red;
});

const isLoading = ref(false);
const toast = useToast();
const isOpen = ref(false)

const deleteTransaction = async() => {
  isLoading.value = true;
  try {
    await supabase.from("transactions").delete().eq("id", props.transaction.id);
     toast.add({
      title: `Transaction with id ${props.transaction.id} deleted`,
      icon: "i-heroicons-exclamation-circle",
    });
    console.log(props.transaction.id)
    emit("deleted", props.transaction.id);
  } catch (error) {
    toast.add({
      title: `Transaction with id ${props.transaction.id} deleted`,
      icon: "i-heroicons-exclamation-circle",
      color: "error",
    });
  } finally {
    isLoading.value = false;
  }
};
const items: DropdownMenuItem[] = [
  {
    label: "Edit",
    icon: "i-heroicons-pencil-square-20-solid",
    onSelect: () => isOpen.value = true,
  },
  {
    color: "error",
    label: "Delete",
    icon: "i-heroicons-trash-20-solid",
    onSelect: () => deleteTransaction(),
  },
  {
    label: "New Choice",
  },
];
</script>
