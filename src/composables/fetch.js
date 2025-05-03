import { ref } from 'vue'
import { API_BASE_URL } from '@/config'

export function useFetch() {
    const data = ref([])
    const error = ref(null)
    const isLoading = ref(false)
    
    async function fetchNow(apiUrl) {
        const url = API_BASE_URL + apiUrl
        isLoading.value = true
        error.value = null

        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            data.value = await response.json()
        }
        catch (err) {
            error.value = err.message || 'Failed to fetch data'
        }
        finally {
            isLoading.value = false
        }
    }

    return { data, error, isLoading, fetchNow }
}