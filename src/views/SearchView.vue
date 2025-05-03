<template>
    <ul class="grid grid-cols-4 gap-4">
        <li v-for="product in searchResult" :key="product.id">
            <img :src="product.thumbnail" class="w-25">
            <span>{{ product.title }}</span>
        </li>
    </ul>
</template>

<script setup>
import { watch, watchEffect, computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useFetch } from '@/composables/fetch'

const router = useRouter()
const route = useRoute()
const { data, error, isLoading, fetchNow } = useFetch()
const searchResult = ref([])

const searchQuery = computed(() => {
  return route.query?.q || ''
})

watch(data, (newVal) => {
  searchResult.value = newVal?.products || []
})

watchEffect(() => {
  fetchNow(`/products/search?q=${searchQuery.value}`)
})
</script>

<style scoped></style>