<template>
    <ul class="flex flex-col gap-y-2">
        <li 
            v-for="(productCategory, index) in productCategories" :key="index"
            class="flex items-center gap-y-4"
        >
            <span>{{ productCategory.label }}</span>
            <div v-if="productCategory.value === 'womens-fashion' || productCategory.value === 'mens-fashion'">
                <PhCaretRight :size="22" />
            </div>
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue'

const productCategories = ref([
  { id: 1, value: 'womens-fashion', label: "Women's Fashion" },
  { id: 2, value: 'mens-fashion', label: "Men's Fashion" },
  { id: 3, value: 'electronics', label: "Electronics" },
  { id: 4, value: 'home-lifestyle', label: "Home & Lifestyle" },
  { id: 5, value: 'medicine', label: "Medicine" },
  { id: 6, value: 'sports-outdoor', label: "Sports & Outdoor" },
  { id: 7, value: 'babies-toys', label: "Baby's & Toys" },
  { id: 8, value: 'groceries-pets', label: "Groceries & Pets" },
  { id: 9, value: 'health-beauty', label: "Health & Beauty" },
])
</script>

<style scoped></style>