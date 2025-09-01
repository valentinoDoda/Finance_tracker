<template>
  <div
    class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 font-bold">
    <div class="flex items-center justify-between">
      {{ date }}
    </div>

    <div class="flex items-center justify-end mr-10">
      {{ currency }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  date: String,
  transactions: Array
})

const totalAmount = computed(()=> {
  return props.transactions.reduce((acc, t) => {
    if(t.type.toLowerCase() == "income"){
      return acc += t.amount
    }
    else{
     return  acc -= t.amount
    }
  }, 0)
})

const {currency} = useCurrency(totalAmount)

</script>