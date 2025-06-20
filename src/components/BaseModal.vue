<template>
    <Teleport to="body">
      <div v-if="visible" class="p-4 fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <Transition name="fade" appear @after-leave="onAfterLeave">
          <div
            v-if="show"
            class="fixed inset-0 bg-black opacity-50"
            @click="handleBackdropClick"
          ></div>
        </Transition>
  
        <!-- Modal -->
        <Transition name="scale-fade" appear>
          <div
            v-if="show"
            :class="[
              'relative z-60 bg-white rounded-lg shadow-lg w-full max-h-[90vh] overflow-y-auto',
              sizeClasses[size]
            ]"
          >
            <!-- Header -->
            <slot name="header"></slot>
  
            <!-- Body -->
            <slot name="body"></slot>
  
            <!-- Footer -->
            <slot name="footer"></slot>
          </div>
        </Transition>
      </div>
    </Teleport>
</template>
  
<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useModalTracker } from '@/composables/modalTracker'

const props = defineProps({
    modelValue: { type: Boolean, required: true },
    size: { type: String, default: 'xl' },
    closableViaBackdrop: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue'])
const { handleModalOpened, handleModalClosed } = useModalTracker()
const show = ref(false)
const visible = ref(false)

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
}

const handleClose = () => {
    emit('update:modelValue', false)
}

const onAfterLeave = () => {
    visible.value = false
}

const handleBackdropClick = () => {
    if (props.closableViaBackdrop) {
        handleClose()
    }
}

watch(() => props.modelValue, (val) => {
    if (val) {
        visible.value = true
        handleModalOpened()
        // allow next tick to trigger transition
        requestAnimationFrame(() => {
            show.value = true
        })
    } else {
        show.value = false
        handleModalClosed()
    }
},
    { immediate: true }
)

onUnmounted(() => {
    if (props.modelValue) handleModalClosed()
})
</script>

<style scoped>
/* Backdrop fade only */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Modal fade + scale */
.scale-fade-enter-active,
.scale-fade-leave-active {
    transition: all 0.3s ease;
}
.scale-fade-enter-from,
.scale-fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>