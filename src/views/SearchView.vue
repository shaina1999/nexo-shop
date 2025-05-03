<template>
    <div v-if="products?.length === 0">
        <p>No products found. Try adjusting your search criteria.</p>
    </div>

    <div v-else class="product-grid">
        <div v-for="product in products" :key="product.id">
            <img :src="product.thumbnail" :alt="product.title">
            <p>{{ product.title }}</p>
            <p>{{ product.price }}</p>
        </div>
    </div>

</template>

<script setup>
import { watch, watchEffect, computed, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useFetch } from '@/composables/fetch'

const router = useRouter()
const route = useRoute()
const { data, error, isLoading, fetchNow } = useFetch()
const products = ref([])

const searchQuery = computed(() => {
  return route.query?.q || ''
})

watch(data, (newVal) => {
  products.value = newVal?.products || []
})

watchEffect(() => {
  fetchNow(`/products/search?q=${searchQuery.value}`)
})

onMounted(() => {
    products.value = data.products
})
</script>