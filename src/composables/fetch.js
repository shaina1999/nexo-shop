import { ref, watchEffect, toValue } from 'vue'
import { API_BASE_URL } from '@/config';

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  const fetchData = async () => {
    const fullUrl = API_BASE_URL + toValue(url)
    
    data.value = null
    error.value = null
    isLoading.value = true

    try {
      const response = await fetch(fullUrl);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      data.value = json
    } catch (error) {
      error.value = error
    } finally {
      isLoading.value = false
    }
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error, isLoading }
}