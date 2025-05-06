<template>
    <div 
        class="w-full border-b-[1px] mb-10"
        :class="{ 'border-b-secondary-500' : isFocus, 'border-b-gray-500' : !isFocus }"
    >
        <input type="text" placeholder="Email or Phone Number" class="w-full outline-none py-1" @focusin="focusInEvent" @focusout="focusOutEvent">
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isFocus = ref(false)

const focusInEvent = () => {
    isFocus.value = true
}

const focusOutEvent = () => {
    isFocus.value = false
}
</script>

<style scoped></style>