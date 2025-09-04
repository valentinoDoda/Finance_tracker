export const useFetchTransactions = () => {
  const supabase = useSupabaseClient();
  const transactions = ref([]);
  const isLoading = ref(false);

  const fetchTransactions = async () => {
    isLoading.value = true;
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });

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

  return {
    refreshTransactions,
    transactions: {
        transactionsGroupedByDate
    },
    incomeTotal,
    expenseTotal,
    isLoading,
    typesOfTransactions
  };
};
