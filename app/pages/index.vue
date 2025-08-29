<template>
  <div>
    Index

    <div class="summary flex justify-between">
      <h1>Summary</h1>
      <u-select-menu :items="selectTime" v-model="selectValue" />
    </div>
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
      <Trend color="green" title="Income" :amount="4000" :last-amount="3000" :loading="false"></Trend>
      <Trend color="red" title="Income" :amount="4000" :last-amount="3000" :loading="false"></Trend>
      <Trend color="green" title="Income" :amount="4000" :last-amount="3000" :loading="false"></Trend>
      <Trend color="red" title="Income" :amount="4000" :last-amount="3000" :loading="false"></Trend>
    </section>
  </div>
</template>
<script setup>
import Trend from '~/components/trend.vue';
import {TIME_OPTIONS} from '../../contants.ts'
const selectTime = TIME_OPTIONS;
//const timeOptions = ["Yearly", "Monthly"]
const selectValue = ref(selectTime[0]);
definePageMeta({
    colorMode: "dark"
})
</script>