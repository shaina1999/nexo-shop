<template>
    <div class="flex items-center justify-center w-full">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl flex">
            <ul class="flex flex-col gap-y-4 border-r-1 border-r-gray-300 w-max pt-10.5 pr-4">
                <li 
                    v-for="(productCategory, index) in productCategories" :key="index"
                    class="flex items-center justify-between gap-x-2 min-w-[200px]"
                >
                    <RouterLink :to="`/products?q=${productCategory.value}`">{{ productCategory.label }}</RouterLink>
                    <div v-if="productCategory.value === 'womens-fashion' || productCategory.value === 'mens-fashion'">
                        <PhCaretRight :size="22" />
                    </div>
                </li>
            </ul>
            <div class="p-10">test</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const productCategories = ref([
  { id: 1, value: 'womens-fashion', label: "Women's Fashion" },
  { id: 2, value: 'mens-fashion', label: "Men's Fashion" },
  { id: 3, value: 'electronics', label: "Electronics" },
  { id: 4, value: 'home-lifestyle', label: "Home & Lifestyle" },
  { id: 5, value: 'medicines', label: "Medicines" },
  { id: 6, value: 'sports-outdoor', label: "Sports & Outdoor" },
  { id: 7, value: 'babies-toys', label: "Baby's & Toys" },
  { id: 8, value: 'groceries-pets', label: "Groceries & Pets" },
  { id: 9, value: 'health-beauty', label: "Health & Beauty" },
])
</script>

<style scoped></style>