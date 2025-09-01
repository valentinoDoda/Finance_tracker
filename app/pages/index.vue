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
        :loading="false"
      ></Trend>
      <Trend
        color="red"
        title="Income"
        :amount="4000"
        :last-amount="3000"
        :loading="false"
      ></Trend>
      <Trend
        color="green"
        title="Income"
        :amount="4000"
        :last-amount="3000"
        :loading="false"
      ></Trend>
      <Trend
        color="red"
        title="Income"
        :amount="4000"
        :last-amount="3000"
        :loading="false"
      ></Trend>
    </section>

    <section>
      <Transaction v-for="transaction in transactions" :key="transaction.id" :transaction="transaction">

      </Transaction>
    </section>
  </div>
</template>
<script setup>
import { TIME_OPTIONS } from "../../contants.ts";
const selectTime = TIME_OPTIONS;
const supabase = useSupabaseClient();


// 2) Χρησιμοποιούμε useAsyncData για SSR-friendly fetch ΜΙΑ φορά
const {
  data: transactions,  // ✅ αυτό θα είναι Ref με το array των rows
  pending,             // ✅ Ref<boolean> αν φορτώνει
  error                // ✅ Ref<Error | null> αν κάτι πάει στραβά
} = await useAsyncData(
  'transactions',      // ✅ KEY για caching/αποφυγή διπλής κλήσης
  async () => {        // ✅ η συνάρτηση που θα τρέξει server-side ή client-side (όχι και τα δύο)
    const { data, error } = await supabase
      .from('transactions')                           // ✅ πίνακας
      .select('*')                                    // ✅ όλα τα πεδία
      .order('created_at', { ascending: false });     // ✅ προαιρετικά: ταξινόμηση νεότερα πρώτα
    if (error) {                                      // ✅ basic error handling
      console.error('Supabase error:', error);
      return [];                                      // ✅ γύρνα κενό για να μην «σπάσει» το template
    }
    return data ?? [];                                // ✅ επιστρέφουμε πάντα array
  }
);
//const timeOptions = ["Yearly", "Monthly"]
const selectValue = ref(selectTime[0]);
definePageMeta({
  colorMode: "dark",
});
</script>
