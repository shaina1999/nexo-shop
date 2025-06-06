<template>
  <div :class="wrapperClass">
    <button 
      :class="minusButtonClass"
      @click="decrease"
      :disabled="modelValue <= min || disableButton"
    >
      <PhMinus :size="18" />
    </button>
    <input 
      :value="modelValue.toString()"
      type="text" 
      :class="inputClass" 
      @input="handleQuantityInput"
      @paste="handleQuantityInput"
      :disabled="disabled"
    >
    <button 
      :class="plusButtonClass"
      @click="increase"
      :disabled="modelValue >= max || disableButton"
    >
      <PhPlus :size="18" />
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  disableButton: {
    type: Boolean,
    default: false,
  },
  wrapperClass: {
    type: String,
    default: 'flex items-center rounded overflow-hidden w-full sm:w-max h-[30px] sm:h-[36px]'
  },
  inputClass: {
    type: String,
    default: 'w-[60px] sm:w-[66px] border-t-[1px] border-t-black border-b-[1px] border-b-black outline-none text-center text-sm sm:text-base h-full disabled:opacity-[0.5]'
  },
  minusButtonClass: {
    type: String,
    default: 'text-lg w-[40px] cursor-pointer h-full border-r-[1px] border flex items-center justify-center rounded-tl-sm rounded-bl-sm hover:!bg-transparent'
  },
  plusButtonClass: {
    type: String,
    default: 'text-lg w-[40px] cursor-pointer h-full border-r-[1px] text-white border-secondary-500 flex items-center justify-center bg-secondary-500 rounded-tr-sm rounded-br-sm'
  },
})

const emit = defineEmits(['update:modelValue'])

const increase = () => {
  if (props?.modelValue < props?.max) emit('update:modelValue', props.modelValue + 1)
}

const decrease = () => {
  if (props?.modelValue > props?.min) emit('update:modelValue', props.modelValue - 1)
}

const handleQuantityInput = (e) => {
  const input = e.target.value.replace(/\D/g, '')
  let parsed = parseInt(input)

  if (isNaN(parsed) || parsed < props.min) {
    parsed = props.min
  } else if (parsed > props.max) {
    parsed = props.max
  }

  e.target.value = parsed
  emit('update:modelValue', parsed) 
}
</script>