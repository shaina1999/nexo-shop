<template>
    <div class="mb-5 md:mb-10">
        <div class="flex items-center mb-6">
            <div class="w-[20px] h-[40px] rounded-sm bg-secondary-500 mr-2.5"></div>
            <p class="text-sm text-secondary-500 font-semibold">
                {{ label }}
            </p>
        </div>
        <div class="flex items:baseline md:items-center justify-between">
            <div class="flex items:baseline md:items-center gap-x-16 flex-col gap-y-2.5 md:flex-row">
                <h2 class="text-2xl md:text-4xl font-semibold text-gray-900">
                    {{ title }}
                </h2>
                <slot name="timer"></slot>
            </div>
            <div>
                <slot name="buttons"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    title: String
})
</script>

<style scoped></style>