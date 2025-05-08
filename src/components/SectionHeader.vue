<template>
    <div class="mb-10">
        <div class="flex items-center mb-6">
            <div class="w-[20px] h-[40px] rounded-sm bg-secondary-500 mr-2.5"></div>
            <p class="text-sm text-secondary-500 font-semibold">
                {{ label }}
            </p>
        </div>
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-x-20">
                <h2 class="text-4xl font-semibold text-gray-900">
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