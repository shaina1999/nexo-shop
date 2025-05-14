<template>
  <section class="flex items-center justify-center w-full pt-16 sm:pt-20">
    <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl">
      <div v-if="products?.length === 0">
        <p>No products found. Try adjusting your search criteria.</p>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-3 md:gap-x-4 md:gap-y-6 lg:gap-x-6 lg:gap-y-8">
        <ProductCard v-for="(product, index) in products" :key="product.id" :product="product" />
      </div>
    </div>
  </section>

</template>

<script setup>
import { watch, watchEffect, computed, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useFetch } from '@/composables/fetch'
import ProductCard from '@/components/ProductCard.vue'

const router = useRouter()
const route = useRoute()
const { data, error, isLoading, fetchNow } = useFetch()

const products = ref([ // sample products
  { id: 1, name: 'Product 1', price: 1000, discountedPrice: 500, discount: 10, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: true },
  { id: 2, name: 'Product 2', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: false },
  { id: 3, name: 'Product 3', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: false },
  { id: 4, name: 'Product 4', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: false },
  { id: 5, name: 'Product 5', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: false },
  { id: 6, name: 'Product 6', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: false },
  { id: 7, name: 'Product 7', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: false },
  { id: 8, name: 'Product 8', price: 2000, discountedPrice: 600, discount: 40, image: '/src/assets/img/product-image.png', reviewsCount: 100, isNew: false },
])

const searchQuery = computed(() => {
  return route.query?.q || ''
})

watch(data, (newVal) => {
  // products.value = newVal?.products || []
})

watchEffect(() => {
  fetchNow(`/products/search?q=${searchQuery.value}`)
})

onMounted(() => {
  // products.value = data.products
})
</script>