<template>
    <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl relative">
        <Transition name="fade-scale">
            <button
                v-if="showScrollTopButton"
                @click="scrollToTop"
                class="cursor-pointer z-1 fixed bottom-12 sm:bottom-5 right-5 bg-secondary-500 text-white p-2.5 md:p-3 rounded-full shadow-lg hover:bg-secondary-300 transition-colors duration-300 ease-in-out"
            >
                <PhArrowUp :size="22" />
            </button>
        </Transition>
    </div>
</template>
  
<script setup>
const emit = defineEmits(['scroll-top'])

defineProps({
    showScrollTopButton: Boolean,
})

const scrollToTop = () => {
    emit('scroll-top')
}
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>