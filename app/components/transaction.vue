<template>
  <div class="grid grid-cols-2 py-4 border-b">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-1">
        <UIcon :name="iconType" :class="iconTypeColor" />
        <div>{{transaction.description}}</div>
      </div>
      <div>
        <UBadge variant="outline" color="neutral">{{transaction?.category || "No category"}}</UBadge>
      </div>
    </div>
    <div class="flex items-center justify-end space-x-2">
      <div>{{ currency }}</div>
      <div>
        <UDropdownMenu :items="items" class="cursor-pointer">
          <UButton class="cursor-pointer" color="neutral" variant="ghost"
            trailing-icon="i-heroicons-ellipsis-horizontal"></UButton>
        </UDropdownMenu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
const iconColors = {
  "red" : "text-red-400",
  "green" : "text-green-400"
} 
const props = defineProps<{
  transaction: {
    id: string,
    amount: number,
    type: string,
    description: string,
    category?: string
  }
}>()
const { currency } = useCurrency(props.transaction.amount);

const isIncome = computed(()=> {
  return props.transaction.type.toLowerCase() == "income"
})

const iconType = computed(() => {
  return isIncome.value ? "i-heroicons-arrow-up-right-16-solid" : "i-heroicons-arrow-down-left-16-solid"
})

const iconTypeColor = computed(() => {
  return isIncome.value ? iconColors.green : iconColors.red;
}) 

const items: DropdownMenuItem[] = [
  {
    label: "Edit",
    icon: "i-heroicons-pencil-square-20-solid",
    onSelect: () => console.log("Edit button is clicked"),
  },
  {
    color: "error",
    label: "Delete",
    icon: "i-heroicons-trash-20-solid",
    onSelect: () => console.log("Delete"),
  },
  {
    label: "New Choice",

  }
];
</script>
