<template>
    <div>
        <div class="font-bold" :class="[color]">{{title}}</div>
        <div class="text-2xl font-extrabold text-black dark:text-white mb-2">
            <USkeleton class="h-8 w-full" v-if="loading"></USkeleton>
            <div v-else>{{amount}}</div>
        </div>
        <div>
            <USkeleton class="h-6 w-full" v-if="loading"></USkeleton>
            <div v-else class="flex space-x-1 items-center text-sm">
                <UIcon name="i-fluent-arrow-trending-24-filled" class="w-6 h-6" :class="[color]"></UIcon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title:  string,
    amount: number,
    lastAmount: number,
    color:string,
    loading: boolean
}>()
</script>
