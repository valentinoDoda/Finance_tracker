<template>
    <div>
        <div class="font-bold" :class="[color]">{{title}}</div>
        <div class="text-2xl font-extrabold text-black dark:text-white mb-2">
            <USkeleton class="h-8 w-full" v-if="loading"></USkeleton>
            <div v-else>{{currency}}</div>
        </div>
        <div>
            <USkeleton class="h-6 w-full" v-if="loading"></USkeleton>
            <div v-else class="flex space-x-1 items-center text-sm">
                <UIcon :name="icon" class="w-6 h-6" :class="trendingUp ? 'green' : 'red'"></UIcon>
                <div class="text-gray-500 dark:text-gray-400">
                    {{percantage}}% vs last period
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title:  string,
    amount: number,
    lastAmount: number,
    color:string,
    loading: boolean
}>();

const {currency} = useCurrency(props.amount);

const trendingUp = computed(()=> {
    return props.amount >= props.lastAmount;
})

const icon = computed(() => {
    return trendingUp.value ? "i-fluent-arrow-trending-24-filled" : "i-fluent-arrow-trending-down-24-filled";
})

const percantage = computed(()=> {
    const result = props.amount - props.lastAmount;
    const smallest = Math.min(props.amount, props.lastAmount)
    return Math.floor(Math.abs(result / smallest) * 100);
})
</script>
