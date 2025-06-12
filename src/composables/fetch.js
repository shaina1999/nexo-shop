import { ref } from 'vue'
import Swal from 'sweetalert2'

export function useFetch() {
    const data = ref([])
    const isLoading = ref(false)
    
    async function fetchNow(url) {
        isLoading.value = true

        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`)
            }
            data.value = await response.json()
        }
        catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message || 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        finally {
            isLoading.value = false
        }
    }

    return { data, isLoading, fetchNow }
}