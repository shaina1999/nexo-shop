import { ref } from 'vue'

const openModalCount = ref(0)

export function useModalTracker() {   
  function handleModalOpened() {
    openModalCount.value++
    if (openModalCount.value === 1) {
      const html = document.documentElement
      html.style.overflow = 'hidden'
    }
  }

  function handleModalClosed() {
    openModalCount.value--
    if (openModalCount.value <= 0) {
      openModalCount.value = 0
      const html = document.documentElement
      html.style.overflow = ''
    }
  }

  return {
    openModalCount,
    handleModalOpened,
    handleModalClosed,
  }
}