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
        :amount="incomeTotal"
        :last-amount="3000"
        :loading="isLoading"
      ></Trend>
      <Trend
        color="red"
        title="Expense"
        :amount="expenseTotal"
        :last-amount="3000"
        :loading="isLoading"
      ></Trend>
      <Trend
        color="green"
        title="Investments"
        :amount="4000"
        :last-amount="3000"
        :loading="isLoading"
      ></Trend>
      <Trend
        color="red"
        title="Saving"
        :amount="4000"
        :last-amount="3000"
        :loading="isLoading"
      ></Trend>
    </section>
    <section class="flex justify-between mb-10">
      <div>
        <h2 class="text-2xl font-extrabold">Transactions</h2>
        <div class="text-gray-500 dark:text-gray-400">
          You have {{ typesOfTransactions.income.length }} incomes and {{ typesOfTransactions.expense.length }} expenses
          this period
        </div>
      </div>
      <div>
        <TransactionModal v-model="isOpen"/>
        <UButton
          icon="i-heroicons-plus-circle"
          color="white"
          variant="solid"
          label="Add"
          @click="isOpen = true"
        />
      </div>
    </section>
    <section v-if="!isLoading">
      <div class="mt-12" v-for="(t, index) in transactionsGroupedByDate">
        <TransactionSummary :date="index" :transactions="t" />
        <TransactionElement
          v-for="transaction in t"
          :key="transaction.id"
          :transaction="transaction"
          @deleted="refreshTransactions"
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
const isOpen = ref(false)

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
  console.log(grouped);
  return grouped;
});

const typesOfTransactions = computed(() => {
  return Object.groupBy(transactions.value, (t) => {
    return t.type.toLowerCase() == "income" ? "income" : "expense";
  });
});

const incomeTotal = computed(() => {
  return typesOfTransactions.value.income.reduce((acc, inc) => {
    return (acc += inc.amount);
  }, 0);
});

const expenseTotal = computed(() => {
  return Math.abs(
    typesOfTransactions.value.expense.reduce((acc, exp) => {
      return (acc -= exp.amount);
    }, 0)
  );
});
console.log(
  transactionsGroupedByDate.value,
  incomeTotal.value,
  expenseTotal.value
);
definePageMeta({
  colorMode: "dark",
});
</script>
