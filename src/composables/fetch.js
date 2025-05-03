import { ref, toValue } from 'vue'
import { API_BASE_URL } from '@/config'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  const fetchNow = async () => {
    const resolvedUrl = toValue(url)
    if (!resolvedUrl) return

    const fullUrl = API_BASE_URL + resolvedUrl

    data.value = null
    error.value = null
    isLoading.value = true

    try {
      const response = await fetch(fullUrl)
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const json = await response.json()
      data.value = json
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return { data, error, isLoading, fetchNow }
}