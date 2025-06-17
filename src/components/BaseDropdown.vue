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
            v-for="option in options"
            :key="optionKey(option)"
            @click="select(option)"
            class="px-4 py-2 text-sm hover:bg-secondary-500 hover:text-white cursor-pointer"
          >
            {{ optionLabel(option).charAt(0).toUpperCase() + optionLabel(option).slice(1) }}
          </li>
        </ul>
      </div>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  modelValue: { type: [String, Number, Object], required: true },
  options: { type: Array, required: true },
  label: { type: String, default: '' },
  optionLabelKey: { type: String, default: '' },
  optionValueKey: { type: String, default: '' },
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

const optionKey = (option) => {
  return props.optionValueKey ? option[props.optionValueKey] : option
}

const displayText = computed(() => {
    if (!props.modelValue) return 'Select'

    if (props.optionLabelKey && typeof props.modelValue === 'object') {
      return props.modelValue[props.optionLabelKey]
    }

    if (props.optionLabelKey && props.optionValueKey) {
      const found = props.options.find(opt => opt[props.optionValueKey] === props.modelValue)
      return found ? found[props.optionLabelKey] : props.modelValue
    }

    return typeof props.modelValue === 'string'
      ? props.modelValue.charAt(0).toUpperCase() + props.modelValue.slice(1)
      : String(props.modelValue)
})

onClickOutside(button, () => {
  isOpen.value = false
})
</script>  