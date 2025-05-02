// stores/mobileNavStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMobileNavStore = defineStore('mobileNav', () => {
  const isOpen = ref(false)

  function updateState(value) {
    isOpen.value = value
  }

  return { isOpen, updateState }
})