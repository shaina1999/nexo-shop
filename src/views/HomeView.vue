<template>
    <div class="flex items-center justify-center w-full">
        <div class="px-4 md:px-8 lg:px-16 xl:px-34 w-full max-w-7xl flex">
            <ul class="flex flex-col gap-y-4 border-r-1 border-r-gray-300 w-max pt-10.5 pr-4">
                <li 
                    v-for="(productCategory, index) in productCategories" :key="index"
                >   
                    <div v-if="productCategory.value === 'womens-fashion' || productCategory.value === 'mens-fashion'">
                        <button 
                            class="cursor-pointer flex items-center justify-between gap-x-2 min-w-[180px] hover:text-orange-500 transition-colors duration-200 ease"
                            @click="toggleSubCategories"
                        >
                            <span>{{ productCategory.label }}</span>
                            <PhCaretRight :size="22" />
                        </button>
                        <!-- Sub Categories -->
                        <ul class="h-0 opacity-0 pointer-events-none">
                            <li>one</li>
                            <li>two</li>
                        </ul>
                    </div>
                    <div v-else>
                        <RouterLink 
                            class="hover:text-orange-500 transition-colors duration-200 ease" 
                            :to="`/products?q=${productCategory.value}`"
                        >
                            {{ productCategory.label }}
                        </RouterLink>
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
  { id: 1, value: 'womens-fashion', label: "Women's Fashion", subCategories: [{ value: 'dresses', label: "Dresses" }, { value: 'tops-blouses', label: "Tops & Blouses" }] },
  { id: 2, value: 'mens-fashion', label: "Men's Fashion", subCategories: [{ value: 'mens-footwear', label: "Footwear" }, { value: 'accessories', label: "Accessories" }] },
  { id: 3, value: 'electronics', label: "Electronics" },
  { id: 4, value: 'home-lifestyle', label: "Home & Lifestyle" },
  { id: 5, value: 'medicines', label: "Medicines" },
  { id: 6, value: 'sports-outdoor', label: "Sports & Outdoor" },
  { id: 7, value: 'babies-toys', label: "Baby's & Toys" },
  { id: 8, value: 'groceries-pets', label: "Groceries & Pets" },
  { id: 9, value: 'health-beauty', label: "Health & Beauty" },
])

const toggleSubCategories = () => {
}
</script>

<style scoped></style>