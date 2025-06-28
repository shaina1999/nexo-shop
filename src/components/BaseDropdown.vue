<template>
  <div :class="wrapperClass">
    <label v-if="label" class="block text-sm font-medium text-black mb-1">
      {{ label }}
    </label>
    <div class="relative">
      <button
        @click="toggle"
        class="gap-x-4 cursor-pointer w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-left focus:ring-primary-500 focus:border-primary-500 flex items-center justify-between"
        ref="button"
      >
        {{ displayText }}
        <PhCaretDown :size="16" class="ml-2 transition-transform" :class="{ 'rotate-180': isOpen }" />
      </button>
      <ul
        v-if="isOpen"
        class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto"
      >
        <li
          v-for="(option, index) in options"
          :key="index"
          @click="select(option)"
          class="px-4 py-2 text-sm hover:bg-secondary-500 hover:text-white cursor-pointer"
        >
          {{ optionLabel(option) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  modelValue: { type: [String, Number, Object, null], required: true },
  options: { type: Array, required: true },
  label: { type: String, default: '' },
  optionLabelKey: { type: String, default: 'label' },
  optionValueKey: { type: String, default: 'value' },
  wrapperClass: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const button = ref(null)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const select = (option) => {
  const value = props.optionValueKey ? option[props.optionValueKey] : option
  emit('update:modelValue', value)
  isOpen.value = false
}

const optionLabel = (option) => {
  return props.optionLabelKey ? option[props.optionLabelKey] : option
}

const displayText = computed(() => {
  if (props.modelValue === null || props.modelValue === undefined) return 'Select'

  const found = props.options.find(opt => {
    if (props.optionValueKey) {
      return opt[props.optionValueKey] === props.modelValue
    }
    return opt === props.modelValue
  })

  return found ? optionLabel(found) : 'Select'
})

onClickOutside(button, () => {
  isOpen.value = false
})
</script>