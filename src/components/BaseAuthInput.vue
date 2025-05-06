<template>
    <div 
        class="w-full border-b-[1px] flex items-center gap-8"
        :class="{ 'border-b-secondary-500' : isFocus, 'border-b-gray-500' : !isFocus }"
    >
        <input 
            :type="inputType" 
            :placeholder="placeholder" 
            class="w-full outline-none py-1" 
            @focusin="focusInEvent" 
            @focusout="focusOutEvent"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        >
        <div v-if="props.type === 'password'">
            <button class="cursor-pointer" @click.prevent="togglePasswordVisibility">
                <PhEye :size="22" :class="{ 'hidden' : showPassword, 'block' : !showPassword }" />
                <PhEyeSlash :size="22" :class="{ 'block' : showPassword, 'hidden' : !showPassword }" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: String,
    type: {
        type: String,
        default: 'text'
    },
    placeholder: String
})

const isFocus = ref(false)
const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const focusInEvent = () => {
    isFocus.value = true
}

const focusOutEvent = () => {
    isFocus.value = false
}

const togglePasswordVisibility = () => {
  if (props.type === 'password') {
    showPassword.value = !showPassword.value
  }
}
</script>

<style scoped></style>