import { defineStore } from "pinia";

export const useSearchStore = defineStore('search', () => {
  const searchTerm = ref('')
  
  function setSearchTerm(newSearchTerm) {
    searchTerm.value = newSearchTerm
  }

  return { searchTerm, setSearchTerm }
})