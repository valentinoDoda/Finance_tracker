<template>
  <div>
    Index

    <div class="summary flex justify-between">
      <h1>Summary</h1>
      <u-select-menu :items="selectTime" v-model="selectValue" />
    </div>
    <section
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
    >
      <Trend
        color="green"
        title="Income"
        :amount="2000"
        :last-amount="3000"
        :loading="isLoading"
      ></Trend>
      <Trend
        color="red"
        title="Income"
        :amount="4000"
        :last-amount="3000"
        :loading="isLoading"
      ></Trend>
      <Trend
        color="green"
        title="Income"
        :amount="4000"
        :last-amount="3000"
        :loading="isLoading"
      ></Trend>
      <Trend
        color="red"
        title="Income"
        :amount="4000"
        :last-amount="3000"
        :loading="isLoading"
      ></Trend>
    </section>

    <section v-if="!isLoading">
      <div class="mt-12" v-for="(t, index) in transactionsGroupedByDate">
        <TransactionSummary :date="index" :transactions="t" />
        <TransactionElement
          v-for="transaction in t"
          :key="transaction.id"
          :transaction="transaction"
          @deleted="refreshTransactions()"
        />
      </div>
    </section>
    <section v-else>
      <USkeleton class="h-8 w-full mb-2" v-for="i in 4" :key="i" />
    </section>
  </div>
</template>
<script setup>
import { TIME_OPTIONS } from "../../contants.ts";
const selectTime = TIME_OPTIONS;
const supabase = useSupabaseClient();
const selectValue = ref(selectTime[2]);
const transactions = ref([]);
const isLoading = ref(false);

const fetchTransactions = async () => {
  isLoading.value = true;
  try {
    const { data, error } = await supabase.from("transactions").select("*");

    if (error) {
      console.error("Σφάλμα στο fetch:", error);
      return [];
    }

    return data;
  } finally {
    isLoading.value = false;
  }
};

const refreshTransactions = async () => {
  transactions.value = await fetchTransactions();
};

await refreshTransactions();

const transactionsGroupedByDate = computed(() => {
  const grouped = Object.groupBy(transactions.value, (transaction) => {
    return new Date(transaction.created_at).toISOString().split("T")[0];
  });
  console.log(grouped)
  return grouped;
});

console.log(transactionsGroupedByDate.value);
definePageMeta({
  colorMode: "dark",
});
</script>
