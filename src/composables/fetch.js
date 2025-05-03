import { ref, watchEffect, toValue } from 'vue'
import { API_BASE_URL } from '@/config';

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  const fetchData = () => {
    const fullUrl = API_BASE_URL + toValue(url)
    
    data.value = null
    error.value = null
    isLoading.value = true
    
    fetch(fullUrl)
      .then((res) => res.json())
      .then((json) => {
        data.value = json
      })
      .catch((err) => {
        error.value = err
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error, isLoading }
}